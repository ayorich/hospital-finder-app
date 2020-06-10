import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import firebase from '../../firebaseConfig';


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


const SideBar: React.FunctionComponent<Props> = (props) => {
    const setmapValue = props.setmapValue;
    const setSpinner = props.setSpinner;
    const classes = useStyles();
    const [searchData, setsearchData] = React.useState<any[]>([]);


    
    React.useEffect(() => {
        //LISTEN AND UPDATE
        firebase.db.collection("results").orderBy("date", "desc").limit(10)
        .onSnapshot(querySnapshot => {
            const docData: any[] = [];
            querySnapshot.forEach(doc => {
                docData.push({
                    id: doc.id,
                    keyword: doc.data().keyword,
                })
            })
            setsearchData(docData)
        })

    }, [])
    const clickHandler = (event: React.MouseEvent<{ id: string }>) => {
        setSpinner(true);
        firebase.db.collection('results')
            .doc(`${event.currentTarget.id}`)
            .get()
            .then((docRef:any) => { 
                setSpinner(false);
                setmapValue(docRef.data().data)
            }).catch(error => {
                alert(error.message)
            })

    } 

    const renderKeywords = searchData.map((data) =>(
                                <ListItem button key={data.id} >
                                        <Typography id={data.id}  onClick={clickHandler}>
                                        {data.keyword}
                                    </Typography>
                                </ListItem>))

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






 // React.useEffect( () => {

    //     getSearchResults()
    // }, [])

    // const getSearchResults = () => {

    //   firebase.db.collection('results').get()
    //     .then(querySnapshot => {
    //         const docData :any[] = [];
    //     querySnapshot.forEach( doc => {
    //         docData.push({ 
    //             id: doc.id, 
    //             // keyword: doc.data().keyword,
    //             // will use `` later for keyword variable
    //             keyword: "South Shore Women's and Children's Hospital"
    //         })
    //         console.log(doc.data())
    //     })
    //         setsearchData(docData)
    //   })
    //   .catch(err => {
    //     alert(err.message)
    //   })
    // }

