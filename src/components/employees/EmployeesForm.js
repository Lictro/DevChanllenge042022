import React from 'react';
import { Row, Col, Space, Modal } from 'antd';
import { Form, Input, Button } from 'antd';
import { Card } from 'antd';
import axios from 'axios';

function EmployeesForm(props) {
    const [id, setId] = React.useState(0);
    const [firstName, setFirstName] = React.useState(props.id);
    const [lastName, setLastName] = React.useState(props.firstname);
    const [location, setLocation] = React.useState(props.location);
    const [dateOfHire, setDateOfHire] = React.useState(props.dateOfHire);
    const [isModalVisible, setIsModalVisible] =  React.useState(false);
    const [mode, setMode] =  React.useState(false);

    const addEmployee = () => {
        setMode(false);
        setIsModalVisible(true);
    };

    useEffect(() => {
        setMode(true);
        setIsModalVisible(true);
    }, [dateOfHire])

    const editEmployee = (employee) => {
        var data = JSON.stringify({
            "id": parseInt(employee.id),
            "firstname": employee.firstname,
            "lastname": employee.lastname,
            "location": employee.location,
            "dateOfHire": employee.dateOfHire
        });
        
        // setMode(true);
        // setIsModalVisible(true);
        
        setId(employee.id);
        setFirstName(employee.firstname);
        setLastName(employee.lastname);
        setLocation(employee.location);
        setDateOfHire(employee.dateOfHire);

        var data = JSON.stringify({
            "id": parseInt(id),
            "firstname": firstName,
            "lastname": lastName,
            "location": location,
            "dateOfHire": dateOfHire
        });

        // alert()
    };

    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    async function fetchData() {
        var config = {
            method: 'get',
            url: 'http://localhost:5000/api/employees',
            headers: { 'Access-Control-Allow-Origin':'*' }
          };
    
        const response = await axios(config);
        console.log("DATA", response.data);
        setEmployees(response.data);
    }

    async function saveEmployee() {
        var data = JSON.stringify({
            "id": parseInt(id),
            "firstname": firstName,
            "lastname": lastName,
            "location": location,
            "dateOfHire": dateOfHire
        });

        var method = mode ? "put" : "post"
          
        var config = {
            method,
            url: 'http://localhost:5000/api/employees',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
    
        const response = await axios(config);
        console.log("DATA", response.data);
        setEmployees(response.data);
        setIsModalVisible(false);
        cleanValue()
    }

    function cleanValue() {
        setId(0);
        setFirstName("");
        setLastName("");
        setLocation("");
        setDateOfHire("");
    }

    async function deleteEmployee(id) {  
        var config = {
            method: 'delete',
            url: 'http://localhost:5000/api/employees/'+id,
            headers: { }
        };
    
        const response = await axios(config);
        console.log("DATA", response.data);
        setEmployees(response.data);
        setIsModalVisible(false);
    }
    
    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{margin: "3%"}}> 
            <Button type="primary" onClick={addEmployee}>Adding!!</Button>
            <Modal title={"ID:->" +id} visible={isModalVisible} onFinish={saveEmployee} onCancel={handleCancel} footer={<></>}>
                <h1>{"ID:->" +id}</h1><Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={saveEmployee}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    
                    <Form.Item
                        label="ID"
                        name="id"
                        rules={[{ required: true }]}
                    >
                        <Input onChange={e => setId(e.target.value)} value={id} />
                    </Form.Item>

                    <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[{ required: true }]}
                    >
                        <Input onChange={e => setFirstName(e.target.value)} value={firstName} />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[{ required: true }]}
                    >
                        <Input onChange={e => setLastName(e.target.value)} value={lastName}/>
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[{ required: true }]}
                    >
                        <Input onChange={e => setLocation(e.target.value)} value={location}/>
                    </Form.Item>

                    <Form.Item
                        label="Hired"
                        name="dateOfHire"
                        rules={[{ required: true }]}
                    >
                        <Input onChange={e => setDateOfHire(e.target.value)} value={dateOfHire}/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default EmployeesForm;
