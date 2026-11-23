type Profile = {
    id: number,
    username: string,
    settings?: {
        notifications: boolean
    }
}

let agent: Profile = {
    id: 1,
    username: "agent@1",
    settings: {
        notifications: true
    }
}

let supervisor: Profile = {
    id: 2,
    username: "supervisor@1",
}

let admin: Profile = {
    id: 3,
    username: "admin@1",
    settings: {}
}

function isNotified(user: Profile): boolean {
    return user.settings?.notifications != undefined ? user.settings.notifications : false
}

console.log(isNotified(admin))