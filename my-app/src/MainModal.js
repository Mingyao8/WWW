import React, { useEffect, useState } from 'react';
import { Select, Tag, Form, Modal, Row, Col, Button, Affix, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import axios from "axios";
import styled from 'styled-components';

const MainModal = (props) => {
    const [friend_data, set_friend_data] = useState([]);
    useEffect(() => {
        axios
            .get('/backend/get_friend.php')
            .then((response) => {
                set_friend_data(response.data.data)
            })
    }, [])
    return (
        <>
            <Modal
                style={{ pointerEvents: 'auto' }}
                open={props.open}
                onCancel={() => props.setOpen(false)}
                setOpen={props.setOpen}
                width={400}
                footer={false}
                className="modalStyle2"
                wrapClassName={"modalStyle2"}
                modalRender={(e) => <>
                    <Col span={24} style={{ backgroundColor: '#D7F5FF' }}>
                        <Row justify={'center'} align={'middle'} style={{ padding: '10px' }}>
                            <Col style={{ fontSize: '1.2rem', fontWeight: 400 }}>{props.title}</Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ backgroundColor: '#ffffff', padding: '20px' }}>
                        <Row gutter={[8, 16]} justify={'center'} >
                            <Form
                                // form={form}
                                // onFinish={(values) => {
                                //     console.log(values)
                                // }}
                                wrapperCol={{
                                    span: 18
                                }}
                                labelCol={{
                                    span: 6
                                }}
                            >
                                <Form.Item
                                    name={'id'}
                                    label={'帳號'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '請記得填寫姓名喔'
                                        }
                                    ]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        labelInValue
                                        onChange={value => props.setEditCard(
                                            pre => {
                                                return (
                                                    {
                                                        ...pre,
                                                        id: value.value,
                                                        name: value.label,
                                                    }
                                                )
                                            }
                                        )}
                                        value={props.editcard.name}
                                        options={friend_data}
                                        placeholder='請選擇好友'
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={'amount'}
                                    label={'金額'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '請記得填寫金額喔'
                                        }
                                    ]}
                                // initialValue={props.editcard.money}

                                >
                                    <Input value={props.editcard.amoount} placeholder='請輸入金額'
                                        onChange={e => props.setEditCard(
                                            pre => {
                                                return (
                                                    {
                                                        ...pre,
                                                        amount: e.target.value
                                                    }
                                                )
                                            }
                                        )} />
                                </Form.Item>
                                <Form.Item
                                    name={'note'}
                                    label={'備註'}
                                // initialValue={props.editcard.note}
                                >
                                    <Input value={props.editcard.note} placeholder='請輸入備註'
                                        onChange={e => props.setEditCard(
                                            pre => {
                                                return (
                                                    {
                                                        ...pre,
                                                        note: e.target.value
                                                    }
                                                )
                                            }
                                        )} />
                                </Form.Item>
                                <Form.Item
                                    name={'alert'}
                                    wrapperCol={{ offset: 6 }}
                                >
                                    <Checkbox
                                        onChange={e => props.setEditCard(
                                            pre => {
                                                return (
                                                    {
                                                        ...pre,
                                                        alert: e.target.checked ? 1 : 0,
                                                    }
                                                )
                                            }
                                        )}>提醒通知</Checkbox>
                                </Form.Item>
                            </Form>
                            <Col span={24}>
                                <Row >
                                    <Col span={24}>
                                        <Affix offsetBottom={5}>
                                            <Row gutter={[10, 10]} align="bottom" justify={"center"}>
                                                <Col >
                                                    <Button
                                                        className='btn'
                                                        onClick={e => { props.edit ? props.handleEdit() : props.handleSubmit() }}
                                                        size='large' style={{ background: '#D7F5FF', color: 'black' }} block
                                                    >{props.edit ? '更新' : '送出'}</Button>
                                                </Col>
                                                <Col>
                                                    <Button className='btn' size='large' style={{ background: '#D9D9D9', color: 'black' }} onClick={(e) => props.setOpen(false)} block>取消</Button>
                                                </Col>
                                            </Row>
                                        </Affix>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </>}
                centered
            />
        </>
    )
}
export default MainModal;