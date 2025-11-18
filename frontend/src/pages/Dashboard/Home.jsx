import React from 'react';
import { useEffect, useState } from "react";
import { me } from '../../services/auth';
import { useUser } from '../../context/UserContext';

export default function Dashboard(){
    const { user } = useUser();

    if (!user) return <div>Loading...</div>;

    return(
        <p>Selamat datang, {user.name}</p>
    );
}