using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace EmpClient
{
    public partial class EmpForm : Form
    {
        bsite.EmployService employService=new bsite.EmployService();
        public EmpForm()
        {
            InitializeComponent();
        }

        private void EmpForm_Load(object sender, EventArgs e)
        {
            List<bsite.Employee> employees=employService.GetAll().ToList();
            grdEmp.DataSource = employees;
        }

        private void btnSearch_Click(object sender, EventArgs e)
        {
            String keyword=txtKeyword.Text.Trim();
            List<bsite.Employee> employees = employService.Search(keyword).ToList();
            grdEmp.DataSource = employees;
        }

        private void grdEmp_SelectionChanged(object sender, EventArgs e)
        {
            if (grdEmp.SelectedRows.Count == 1)
            {
                int id = int.Parse(grdEmp.SelectedRows[0].Cells["ID"].Value.ToString());
                bsite.Employee employee = employService.GetEmployee(id);
                if (employee!=null)
                {
                    txtID.Text = employee.ID.ToString();
                    txtName.Text = employee.Name;
                    txtAddress.Text = employee.Address;
                    txtSalary.Text = employee.Salary.ToString();
                    txtAge.Text = employee.Age.ToString();
                }
            }
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            bsite.Employee employee = new bsite.Employee()
            {
                ID = 0,
                Name = txtName.Text.Trim(),
                Address = txtAddress.Text.Trim(),
                Salary = int.Parse(txtSalary.Text.Trim()),
                Age = int.Parse(txtAge.Text.Trim()),
            };
            bool result = employService.Add(employee);
            if (result)
            {
                List<bsite.Employee> employees = employService.GetAll().ToList();
                grdEmp.DataSource = employees;
            }
            else
            {
                MessageBox.Show("SORRY HONEY");
            }
        }

        private void btnEdit_Click(object sender, EventArgs e)
        {
            bsite.Employee employee = new bsite.Employee()
            {
                ID = int.Parse(txtID.Text.Trim()),
                Name = txtName.Text.Trim(),
                Address = txtAddress.Text.Trim(),
                Salary = int.Parse(txtSalary.Text.Trim()),
                Age = int.Parse(txtAge.Text.Trim()),
            };
            bool result = employService.Update(employee);
            if (result)
            {
                List<bsite.Employee> employees = employService.GetAll().ToList();
                grdEmp.DataSource = employees;
            }
            else
            {
                MessageBox.Show("SORRY HONEY");
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            DialogResult dialogResult = MessageBox.Show("ARE U SURE?", "CONFIRMATION", MessageBoxButtons.YesNo);
            if (dialogResult == DialogResult.Yes)
            {
                int id = int.Parse(txtID.Text.Trim());
                bool result = employService.Delete(id);
                if (result)
                {
                    List<bsite.Employee> employees = employService.GetAll().ToList();
                    grdEmp.DataSource = employees;
                }
                else
                {
                    MessageBox.Show("SORRY HONEY");
                }
            }
        }
    }
}
