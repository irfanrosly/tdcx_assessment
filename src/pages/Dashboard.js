import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TodoActions from "../redux/todo"
import styled from "styled-components"
import { Flex, Box } from "../components"
import { TrashIcon, PencilIcon } from "../components/icons"

const Container = styled.div`
	background-color: #f4f4f6;
	min-height: 100vh;
	width: 100%;
`
const Header = styled(Flex)`
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 6px #00000029;
	opacity: 1;
`

const Card = styled(Box)`
	min-height: 158px;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 6px #0000000a;
	opacity: 1;
	margin: 8px 0px 0px 0px;
	border-radius: 12px;
`
const CardContent = styled.div`
	padding: 24px;
`

const CardContentTaskList = styled.div`
	min-height: 75px;
	border-bottom: 1px solid #e8e8e8;
	margin-left: 16px;
	align-items: center;
	display: flex;
`

const Input = styled.input`
	padding: 12px;
	margin: 4px 0px;
	background: #d9dfeb;
	border: none;
	border-radius: 8px;
	width: 244px;
	font-size: 14px;
	text-align: center;
`

const Button = styled.button`
	background-color: #5285ec;
	color: #ffffff;
	font-size: 14px;
	margin: 12px;
	padding: 12px;
	border: none;
	border-radius: 8px;
	width: 270px;
	height: 40px;
	cursor: pointer;
`

const CompletedText = styled(Box)`
	text-decoration: line-through;
`

const Dashboard = () => {
	const { dataDashboard, taskLists } = useSelector((state) => state.todo)
	const { data } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(TodoActions.getDashboard())
	}, [taskLists])

	useEffect(() => {
		dispatch(TodoActions.getTasks())
	}, [dataDashboard.totalTasks])

	const [taskName, setTaskName] = useState("")
	return (
		<Container>
			<Header
				bg='#FFFFFF'
				height={72}
				display='flex'
				flexDirection='row'
				px={[0, 128]}
				alignItems='center'
				justifyContent='space-between'
			>
				<Box pl={["24px", "0px"]}>{data.name}</Box>
				<Box pr={["24px", "0px"]}>Logout</Box>
			</Header>
			<Flex
				display='flex'
				flexDirection={["column", "row"]}
				justifyContent='space-between'
				px={[0, 128]}
			>
				<Card width={[1, "302px"]}>
					<CardContent>
						<span style={{ fontSize: 20, color: "#537178" }}>Task Completed</span>
						<div style={{ fontSize: 20 }}>
							<span style={{ fontSize: 64, color: "#5285EC" }}>{dataDashboard.tasksCompleted}</span>{" "}
							/ {dataDashboard.totalTasks}
						</div>
					</CardContent>
				</Card>
				<Card width={[1, "302px"]}>
					<CardContent>
						<span style={{ fontSize: 20, color: "#537178" }}>Latest Task Created</span>
						<ul style={{ paddingLeft: 24 }}>
							{dataDashboard.latestTasks &&
								dataDashboard.latestTasks.map((i) => {
									return <li style={{ fontSize: 14, color: "#8F9EA2" }}>{i.name}</li>
								})}
						</ul>
					</CardContent>
				</Card>
				<Card width={[1, "302px"]}>
					<CardContent>
						<span style={{ fontSize: 20 }}>Task Completion Chart</span>
					</CardContent>
				</Card>
			</Flex>
			<Flex
				pt={2}
				px={[0, 128]}
				alignItems='center'
				justifyContent={["center", "flex-end"]}
				display='flex'
				flexDirection={["column", "row"]}
			>
				<Input placeholder='Search Task by Name' onChange={(e) => setTaskName(e.target.value)} />
				<Button onClick={() => alert("Open Modal")}>+ New Task</Button>
			</Flex>
			<Flex px={[0, 128]}>
				<Card>
					{taskLists &&
						taskLists.map((i) => {
							return (
								<CardContentTaskList>
									<Box width={[0.1, 0.05]}>
										<input type='checkbox' checked={i.completed} />
									</Box>
									{i.completed ? (
										<CompletedText
											width={[0.75, 0.8]}
											fontSize={20}
											color='#537178'
											textDecorationLine='line-through'
										>
											{i.name}
										</CompletedText>
									) : (
										<Box width={[0.75, 0.8]} fontSize={20} color='#5285EC'>
											{i.name}
										</Box>
									)}
									<Box
										width={0.15}
										display='flex'
										justifyContent='center'
										alignItems='center'
										pt={3}
									>
										<Box onClick={() => alert("Pencil")}>
											<PencilIcon width={30} height={30} />
										</Box>
										<Box onClick={() => dispatch(TodoActions.deleteTask(i._id))}>
											<TrashIcon width={30} height={30} />
										</Box>
									</Box>
								</CardContentTaskList>
							)
						})}
				</Card>
			</Flex>
		</Container>
	)
}

export default Dashboard
