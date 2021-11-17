using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace EmpSite
{
    /// <summary>
    /// Summary description for EmployService
    /// </summary>
    [WebService(Namespace = "http://sniv.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class EmployService : System.Web.Services.WebService
    {
        [WebMethod]
        public List<Employee> GetAll()
        {
            List<Employee> employees = new EmployDAO().SelectAll();
            return employees;
        }
        [WebMethod]
        public List<Employee> Search(string keyword)
        {
            List<Employee> employees = new EmployDAO().SelectByKeyword(keyword);
            return employees;
        }
        [WebMethod]
        public Employee GetEmployee(int ID)
        {
            Employee employee = new EmployDAO().SelectByCode(ID);
            return employee;
        }
        [WebMethod]
        public bool Add(Employee employee)
        {
            bool res = new EmployDAO().Insert(employee);
            return res;
        }
        [WebMethod]
        public bool Update(Employee employee)
        {
            bool res = new EmployDAO().Update(employee);
            return res;
        }
        [WebMethod]
        public bool Delete(int ID)
        {
            bool res = new EmployDAO().Delete(ID);
            return res;
        }

    }
}
