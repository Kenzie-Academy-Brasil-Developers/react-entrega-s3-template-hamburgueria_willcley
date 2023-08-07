import './styles/reset.scss';
import './styles/globalStyles.scss';
import './styles/typography.scss';
import './styles/buttons.scss';
import { HomePage } from './pages/HomePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const App = () => {
  return (
    <>
      <HomePage />
      <ToastContainer position='bottom-right'/>
    </>
  )
}
