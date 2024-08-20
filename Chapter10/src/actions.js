"use server"

import { cookies } from "next/headers"
import { getIronSession } from "iron-session"
import { sessionOptions } from "./lib"
import { redirect } from "next/navigation"

export const getSession = async () => {

    const session = await getIronSession(cookies(), sessionOptions)

    return session

}

export const login = async (status, formData) => {

    const username = formData.get("username")
    const password = formData.get("password")

    const result = await fetch(`${process.env.API_URL}/users/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ username, password })

    })

    const data = await result.json()
    const session = await getSession()

    if (result.ok) {

        session.username = data.username
        session.jwt = data.token
        await session.save()
        redirect("/private")

    } else {
        session.destroy()

        return { error: data.detail }
    }

}


export const logout = async () => {

    const session = await getSession()
    session.destroy()
    redirect("/")

}

export const createCar = async (state, formData) => {


    const session = await getSession()
    const jwt = session.jwt



    const result = await fetch(`${process.env.API_URL}/cars/`, {

        method: "POST",
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        body: formData

    })

    const data = await result.json()

    if (result.ok) {
        redirect("/")

    } else {
        return { error: data.detail }
    }
}


