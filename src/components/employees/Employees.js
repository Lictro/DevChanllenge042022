import React from 'react';
import { Row, Col, Space, Modal } from 'antd';
import { Form, Input, Button } from 'antd';
import { Card } from 'antd';
import axios from 'axios';

function Employees() {
    const [id, setId] = React.useState(0);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [dateOfHire, setDateOfHire] = React.useState("");
    const [employees, setEmployees] = React.useState([]);
    const [isModalVisible, setIsModalVisible] =  React.useState(false);
    const [mode, setMode] =  React.useState(false);

    const addEmployee = () => {
        cleanValue()
        setMode(false);
        setIsModalVisible(true);
    };

    const editEmployee = (employee) => {
        setId(employee.id);
        setFirstName(employee.firstname);
        setLastName(employee.lastname);
        setLocation(employee.location);
        setDateOfHire(employee.dateOfHire);


        setMode(true);
        setIsModalVisible(true);
    };

    
    const handleCancel = () => {
        cleanValue()
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
        var url = mode ? 'http://localhost:5000/api/employees/' + id : 'http://localhost:5000/api/employees'
          
        var config = {
            method,
            url: url,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
    
        const response = await axios(config);
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
            <Button type="primary" onClick={() => addEmployee()}>Add</Button>
            <Modal title="Basic Modal" visible={isModalVisible} onFinish={() => saveEmployee()} onCancel={() => handleCancel()} footer={<></>}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={saveEmployee}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ 
                        id: id, 
                        firstname: firstName, 
                        lastname: lastName, 
                        location: location, 
                        dateOfHire: dateOfHire
                    }}
                >
                    <Form.Item
                        label="ID"
                        name="id"
                        rules={[{ required: true }]}
                    >
                        <Input disabled={mode} onChange={e => setId(e.target.value)} value={id} />
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
            <Row> {
                employees.map((employee) => 
                    <Col span={8} id={employee.id}>
                        <Space align="center">
                            <Card title={"ID:" + employee.id} style={{ width: 300 }} extra=
                                {<div>
                                    <a href="#" onClick={() => editEmployee(employee)} style={{marginRight: "10px"}}>Edit</a>
                                    <a href="#" onClick={() => deleteEmployee(employee.id)}>Delete</a>
                                </div>} 
                            > 
                                <p>First Name: {employee.firstname}</p>
                                <p>Last Name:{employee.lastname}</p>
                                <p>Location: {employee.location}</p>
                                <p>Hire: {employee.dateOfHire}</p>
                            </Card>
                        </Space>
                    </Col>)
            }</Row>
        </div>
    );
}

export default Employees;
