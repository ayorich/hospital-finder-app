import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
    // const rows = props.mapValue;
    const classes = useStyles();
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
                <ListItem button >
                    <Typography>
                        South Shore Women's and Children's Hospital
                    </Typography>
                </ListItem>
                <ListItem button >
                    <Typography>
                        South Shore Women's and Children's Hospital
                    </Typography>
                </ListItem>
                <ListItem button >
                    <Typography>
                        South Shore Women's and Children's Hospital
                    </Typography>
                </ListItem>
            </List>
            
        </ExpansionPanel>

        );
}


export default SideBar;