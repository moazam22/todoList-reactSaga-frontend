import {useState} from 'react';
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
import { styled } from '@mui/material/styles';
import {useSelector, useDispatch} from 'react-redux';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {postTodo, editTodo, deleteTodo,changeStatus} from '../redux/actions/todo';

const moment = require('moment');


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



function Todos(props){

	const lists = useSelector((state)=>state.lists.lists);
	const [title, setTitle] = useState('');
	const [date, setDate] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [marked, setMarked] = useState(false);


	const {list} = props;
	let selectedList = !!list ? lists.filter(list => list._id === props.list._id)[0] : null;

	const dispatch = useDispatch();


	const onDelete = (e,id)=>{
		dispatch(deleteTodo(list._id,{
			id: id
		}));
	}

	const onEdit = (e,id,dueDate,marked) =>{
		let selectetdTodo = !!list.todos && !!list.todos.length ? list.todos.filter(todo=> todo._id === id)[0] : null; 
		setTitle(!!selectetdTodo ? selectetdTodo.title: '');
		setIsEdit(id);
		setDate(dueDate);
		setMarked(marked);
	}

	const onStatusChange = (e,id)=>{
		console.log(list._id,id);
		dispatch(changeStatus(list._id,id));
	}

	function createData(id,dueDate,title,marked) {
		let date = moment(dueDate).format('MM-DD-YYYY');
		const editButton = <Button onClick={(e)=>onEdit(e,id,dueDate,marked)}><EditIcon/></Button>
		const deleteButton = <Button onClick={(e)=>onDelete(e,id)}><DeleteIcon style={{'color': 'red'}}/></Button>
	  	const mark = <Button onClick={(e)=>onStatusChange(e,id)}>{!marked ? <ClearIcon/> : <CheckIcon />}</Button>
	  	return { title, date, id, editButton, deleteButton, mark };
	}
	const rows = (!!selectedList && !!selectedList.todos.length) && selectedList.todos.map(tableData => createData(tableData._id, tableData.dueDate, tableData.title,tableData.marked));
	

	const onTodoAdd = () => {
		if(!isEdit){
			(!!title) && dispatch(postTodo(list._id,{
				title: title,
				dueDate: !!date ? date : false,
				marked: 'false'
			}));
			setTitle('');
			setDate(false);
		}else{
			(!!title) && dispatch(editTodo(selectedList._id,{
				id: isEdit,
				title: title,
				dueDate: date,
				marked: marked
			}))
			setIsEdit(false);
			setTitle('');
		}
	}
	const onDateChange = (e)=>{
		setDate(e.target.value);
	}

	return(
		<>
			<div style={{'padding': '0em'}}>
				<TextField 
					style= {{ 'marginRight': '1em', 'boxShadow': '0 1px 6px rgba(32,33,36,.28)' }}
					id="outlined-basic" 
					label="Enter Name of todo"
					value = {title} 
					variant="outlined"
					size="small"
					onChange = {(event)=>setTitle(event.target.value)}
				/>
				{!isEdit && <input default='mm/dd/yyyy' style={{'padding': '0.5em', 'marginRight': '1em'}} onChange={(e)=>onDateChange(e)} type="date"/>}
				<Button style={{'paddingLeft':'1em'}} variant="contained" onClick={onTodoAdd}>{!isEdit ? 'Add Todo' : 'Update Todo'}</Button>
			</div><br/>
			<div style={{'paddingTop': '1em'}}>
			{(!!rows && rows.length) &&
				<TableContainer sx={{ maxWidth: '75%','boxShadow': '0 1px 15px rgba(32,33,36,.28)'}} component={Paper}>
				<Table  aria-label="customized table">
				<TableHead>
				  <TableRow >
				    <StyledTableCell align="right">Marked</StyledTableCell>
				    <StyledTableCell align="right">Title</StyledTableCell>
				    <StyledTableCell align="right">Due Date</StyledTableCell>				    
				    <StyledTableCell align="right">Edit</StyledTableCell>
				    <StyledTableCell align="right">Delete</StyledTableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				{
				  	(!!rows && rows.length) && rows.map((row) => (
				    <StyledTableRow key={row.id}>
				    	<StyledTableCell align="right">{row.mark}</StyledTableCell>
						<StyledTableCell component="th" scope="row">
							{row.title}
						</StyledTableCell>
						<StyledTableCell align="right">{row.date}</StyledTableCell>
						<StyledTableCell align="right">{row.editButton}</StyledTableCell>
						<StyledTableCell align="right">{row.deleteButton}</StyledTableCell>
					</StyledTableRow>
				  ))
				}
				</TableBody>
				</Table>
				</TableContainer>
			}
			</div>
		</>	
	)
}

export default Todos;