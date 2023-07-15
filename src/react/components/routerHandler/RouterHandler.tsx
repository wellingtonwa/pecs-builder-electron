import { Center, Paper, Space, Title } from '@mantine/core';
import React, { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const RouteHandler: FC = () => {
    const navigate = useNavigate();

    return (
        
      <Paper mx="auto" mt={'xl'}>
        <Center>
            <Title order={1}>PECS Builder</Title>
        </Center>
        <Space h={'xl'}/>
        <Outlet/>
      </Paper>
    )

};

export default RouteHandler;