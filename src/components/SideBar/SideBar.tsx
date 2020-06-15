import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import firebase from '../../firebaseConfig';
import axios from "axios";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
);

interface Props {
    setmapValue: any;
    setSpinner: any;
}
const axiosGraphQL = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://us-central1-map-finder-3666f.cloudfunctions.net/graphql',
});



const SideBar: React.FunctionComponent<Props> = (props) => {
    const setmapValue = props.setmapValue;
    const setSpinner = props.setSpinner;
    const classes = useStyles();
    const [searchData, setsearchData] = React.useState([]);
    const [userState, setuserState] = React.useState('');

// GRAPHQL QUERY FOR A USER DATA
    const GET_DATA = `
      query FeedSearchQuery($userID: ID!) {
        results(userID: $userID) {
          keyword
          docID
        }
      }
    `;

// GRAPHQL QUERY FOR A DOCUMENT DATA
    const GET_TABLE_DATA =`query FeedSearchQuery($docID: ID!){
                                    datas(docID:$docID){
                                        data{
                                            id
                                            rating
                                            vicinity
                                            user_ratings_total
                                            name
                                            geometry{
                                                location{
                                                        lat
                                                        lng
                                                    }
                                                }
                                            }
                                        }
                                    }`

//SETS THE USER ID AND UNSUBSCRIBE
  React.useEffect(() => {
      firebase.auth.onAuthStateChanged((authUser: any) => {
        setuserState(authUser.uid)
      })
    const unsubscribe = firebase.auth.onAuthStateChanged((authUser: any) => {
      setuserState('')
    })
    return () => {
      unsubscribe();
    }
  },
    [])

    
 

  const clickData = () => {
      axiosGraphQL
      .post("", {
        query: GET_DATA,
        variables: {
          userID: `${userState}`,
        },
      })
      .then((result: any) => {
        setsearchData(result.data.data.results);
      })
      console.log('am clicked')

  }
    
// HANDLES THE ONCLICK EVENT FROM THE SIDEBAR LIST TO UPDATE THE DISPLAY TABLE AND MAP DATAS
  const clickHandler = (event: React.MouseEvent<{ id: string }>) => {
      const docId = event.currentTarget.id;
      // SETS SPINNER TO TRUE AND POST ITS REQUEST {QUERY, VARIABLES}
      setSpinner(true);
      axiosGraphQL
        .post("", {
          query: GET_TABLE_DATA,
          variables: {
            docID: `${docId}`,
          },
        })
        .then((data: any) => {
        // SETS SPINNER TO FALSE AND SETS MAP DATA VALUES
          setSpinner(false);
          setmapValue(data.data.data.datas[0].data);
        })
        .catch((error: any) => {
        // SETS SPINNER TO FALSE AND ALERT ERRORS
          setSpinner(false);
          alert("NETWORK ERROR!!! PLEASE RETRY");
        });

  } 
    
// RETURNS A LIST OF SEARCH DATAS FROM DATABASE AND PASS THE docID 
  const renderKeywords = searchData.map((data :any, i) => {
      return (
        <ListItem
          button
          key={data.docID}
          id={data.docID}
          onClick={clickHandler}
        >
          <Typography>{data.keyword}</Typography>
        </ListItem>
      );});

  return (
    <ExpansionPanel onClick={clickData}>
          <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
          >
              <Typography className={classes.heading}>RECENTLY SEARCHED RESULTS</Typography>
          </ExpansionPanelSummary>
          <List component="nav" aria-label="secondary mailbox folders">
              {renderKeywords}
          </List>
          
      </ExpansionPanel>

      );
}


export default SideBar;







