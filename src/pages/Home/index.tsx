import BottomNewTask from '../../components/BottomNewTask'
import SideBar from '../../containers/SideBar'
import TaskList from '../../containers/TaskList'

const Home = () => (
  <>
    <SideBar showFilters />
    <TaskList />
    <BottomNewTask />
  </>
)

export default Home
