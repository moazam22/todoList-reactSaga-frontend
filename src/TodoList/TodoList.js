import {useState, useEffect} from 'react';
import {
	TextField,
	Button,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from '@mui/material';
import Todos from './Todos';
import { styled } from '@mui/material/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {useSelector, useDispatch} from 'react-redux';
import {getLists, postList, editList, deleteList} from '../redux/actions/lists';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




function TodoList(){

	const [input, setInput] = useState('');
	const [isEdit, setIsEdit] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState('');
	const dispatch = useDispatch();
	const state = useSelector((state)=>state);
	const lists = state.lists.lists;


	
	useEffect(()=>{
		dispatch(getLists());
	},[]);

	const onAdd = async()=>{
		if(!isEdit){
			dispatch(postList({
				name: input,
				todo: []
			}));
			setInput('');
		}else{
			dispatch(editList(isEdit,{
				name: input,
				todo: []
			}))
			setIsEdit(false);
			setInput('');
		}
	}

	const onEdit = (e,id)=>{
		e.stopPropagation();
		let list = lists.filter(list=> list._id === id)[0];
		setInput(list.name);
		setIsEdit(id);
	}

	const onDelete = async (e,id)=>{
		e.stopPropagation();
		try{
			dispatch(deleteList(id))
		}catch(e){
			console.log("Error: ", e);
		}
	}

	
	function createData(id,Name) {
		const editButton = <Button onClick={(e)=>onEdit(e,id)}><EditIcon/></Button>
		const deleteButton = <Button onClick={(e)=>onDelete(e,id)}><DeleteIcon style={{'color': 'red'}}/></Button>
	  	return { Name, editButton, deleteButton, id };
	}

	const rows = (!!lists && lists.length) && lists.map(tableData => createData(tableData._id, tableData.name));

	const showTodos = (id,)=>{
		setSelectedTodo(id);
	}
	

	return(
		<>
			<center><h1>Todo List</h1></center>
			<div style={{'display': 'flex'}}>
				<div style={{'display': 'flex', 'flexDirection': 'column'}}>
					<div style={{'display': 'inline','padding': '1em'}} >
					  <TextField 
					  	style= {{ 'marginRight': '1em', 'boxShadow': '0 1px 6px rgba(32,33,36,.28)' }}
					  	id="outlined-basic" 
					  	label="Enter Name of list"
					  	value = {input} 
					  	variant="outlined"
					  	size="small"
					  	onChange = {(event)=>setInput(event.target.value)}
					  	/>
					  <Button style= {{ }} variant="contained" onClick={onAdd}>{(!isEdit) ? 'Add' : 'Update'}</Button>
					</div>
					<div style={{'padding': '1em'}}>
						<TableContainer sx={{ maxWidth: '25em','boxShadow': '0 1px 15px rgba(32,33,36,.28)'}} component={Paper}>
						<Table  aria-label="customized table">
						<TableHead>
						  <TableRow >
						    <StyledTableCell align="right">Name</StyledTableCell>
						    <StyledTableCell align="right">Edit</StyledTableCell>
						    <StyledTableCell align="right">Delete</StyledTableCell>
						  </TableRow>
						</TableHead>
						<TableBody>
						  {(!!rows && rows.length) && rows.map((row) => (
						    <StyledTableRow style={{'cursor': 'pointer'}} key={row.id} onClick={()=>showTodos(row.id)}>
								<StyledTableCell component="th" scope="row">
									{row.Name}
								</StyledTableCell>
								<StyledTableCell align="right">{row.editButton}</StyledTableCell>
								<StyledTableCell align="right">{row.deleteButton}</StyledTableCell>
							</StyledTableRow>
						  ))}
						</TableBody>
						</Table>
						</TableContainer>
					</div>
				</div>
				{
					(!!selectedTodo) &&
					<div style={{'flex':'1', 'display': 'flex', 'flexDirection': 'column'}}>
						<div style={{'display': 'inline','padding': '1em'}} >
							<Todos list = { lists.filter(list=> list._id === selectedTodo)[0] }/>
						</div>
						
					</div>	
				}
			</div>
		</>
	);
}

export default TodoList;
