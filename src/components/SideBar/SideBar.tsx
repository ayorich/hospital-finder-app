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

// import ApolloClient, { gql } from "apollo-boost";


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

// const client = new ApolloClient({
//   uri:
    // "https://cors-anywhere.herokuapp.com/https://us-central1-map-finder-3666f.cloudfunctions.net/graphql",
//   request: (operation) => {
//     operation.setContext({
//       headers: {
//         authorization: `Bearer your-personal-access-token`,
//       },
//     });
//   },
// });

const SideBar: React.FunctionComponent<Props> = (props) => {
    const setmapValue = props.setmapValue;
    const setSpinner = props.setSpinner;
    const classes = useStyles();
    const [searchData, setsearchData] = React.useState([]);
    const [userState, setuserState] = React.useState('');
    // console.log(userState)



    const GET_DATA = `
      query FeedSearchQuery($userID: ID!) {
        results(userID: $userID) {
          keyword
          docID
        }
      }
    `;

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



    React.useEffect(() => {
        firebase.auth.onAuthStateChanged((authUser: any) => {
        console.log(authUser)
        setuserState(authUser.uid)
        
        
        })}, [])

  React.useEffect(() => {
    axiosGraphQL
      .post("", {
        query: GET_DATA,
        variables: {
          userID: `${userState}`,
        },
      })
      .then((result: any) => {
        //   console.log(result.data.data.results);
        setsearchData(result.data.data.results);
      });
  }, [GET_DATA, userState]);
    

    const clickHandler = (event: React.MouseEvent<{ id: string }>) => {
        const docId =event.currentTarget.id;
        console.log(docId)
        setSpinner(true);
        axiosGraphQL
          .post("", {
            query: GET_TABLE_DATA,
            variables: {
              docID: `${docId}`,
            },
          })
          .then((data: any) => {
            setSpinner(false);
            console.log(data.data.data.datas[0].data);
            setmapValue(data.data.data.datas[0].data);
          })
          .catch((error: any) => {
            setSpinner(false);
            alert("NETWORK ERROR!!! PLEASE RETRY");
          });

    } 
    

    const renderKeywords = searchData.map((data :any, i) => {
        // console.log(data)
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
        <ExpansionPanel>
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







