export type Candidate = {
    id: string
    name: string
    status: "toreview" | "candidate" | "rejected" | "approved"
    email: string,
    phone: string,
    createdAt: string
}

export const testDataCandidate: Candidate[] = [
    {
        id: "1",
        name: "Juan Pérez",
        status: "toreview",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-01T12:00:00Z",
    },
    {
        id: "2",
        name: "María López",
        status: "candidate",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-02T12:00:00Z",
    },
    {
        id: "3",
        name: "Carlos García",
        status: "rejected",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-03T12:00:00Z",
    },
    {
        id: "4",
        name: "Ana Martínez",
        status: "approved",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-04T12:00:00Z",
    },
    {
        id: "5",
        name: "Luis Hernández",
        status: "toreview",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-05T12:00:00Z",
    },
    {
        id: "6",
        name: "Sofía Ramírez",
        status: "candidate",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-06T12:00:00Z",
    },
    {
        id: "7",
        name: "Diego Torres",
        status: "rejected",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-07T12:00:00Z",
    },
    {
        id: "8",
        name: "Valentina Díaz",
        status: "approved",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-08T12:00:00Z",
    },
    {
        id: "9",
        name: "Andrés Jiménez",
        status: "toreview",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-09T12:00:00Z",
    },
    {
        id: "10",
        name: "Camila Morales",
        status: "candidate",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-10T12:00:00Z",
    },
    {
        id: "11",
        name: "Fernando Castro",
        status: "rejected",
        email: "example@example.com",
        phone: "(+52) 123 456 7890",
        createdAt: "2023-10-11T12:00:00Z",
    },
];