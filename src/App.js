import CompanyList from './components/companyList/companyList';
import EmployeeList from './components/employeeList/employeeList';

function App() {

  return (
    <div >
      <div className='wrapper'>
        <h1 className='title'>Компании и сотрудники</h1>
        <div className='content'>
          <CompanyList />
          <EmployeeList />
        </div>
      </div>
    </div>
  );
}

export default App;
