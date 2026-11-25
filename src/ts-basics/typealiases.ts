type Employee = {
    readonly id: number,
    name?: string,
    retire: (date: Date) => void
}

let employeeOne: Employee = {
    id: 1,
    name: 'Dennis',
    retire: (date: Date) => {
        console.log(date)

    }
}

employeeOne.retire(new Date("2026-11-23T14:30:00Z"))