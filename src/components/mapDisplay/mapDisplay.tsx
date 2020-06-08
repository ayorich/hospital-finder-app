import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


/**
 * GOOGLE DATA EXTRACTED
// id: "8b2aad7a50a1b54308c19c4502d7988b6dd03cce"
// name: "Fremont Hotel & Casino"
// place_id: "ChIJFTJhO6DDyIARYs7dJsDxK2Y"
// rating: 4.3
// user_ratings_total: 10701
***/

    interface Props { 
        mapValue:any;
    }

    const DisplayMaps: React.FunctionComponent<Props> = (props) => {
        const rows = props.mapValue;
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            {rows ?<Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>NAME</TableCell>
                        <TableCell align="right">Rating</TableCell>
                        <TableCell align="right">Total rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                     {rows.map((row:any) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.rating}</TableCell>
                            <TableCell align="right">{row.user_ratings_total}</TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>: null} 
        </TableContainer>
                
  );
}


export default DisplayMaps;