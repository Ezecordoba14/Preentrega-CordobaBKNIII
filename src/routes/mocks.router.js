import { Router } from "express";
import { generateMockPets, generateMockUsers } from "../mocks/mocking.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

const router = Router()

router.get('/mockingpets', (req, res) => {
    let petsNumber = req.query.num
    petsNumber ? petsNumber : petsNumber = 50;
    const mockPets = generateMockPets(petsNumber)
    res.send({ status: 'succes', payload: mockPets })
})
router.get('/mockingusers', async (req, res) => {
    let usersNumber = req.query.num
    usersNumber ? usersNumber : usersNumber = 50;
    const mockusers = await generateMockUsers(usersNumber)

    res.send({ status: 'succes', payload: mockusers })
})
router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = await generateMockUsers(users);
    const newUser =await userModel.insertMany(mockUsers)

    const mockPets = generateMockPets(pets);
    const newPets = await petModel.insertMany(mockPets)

    res.send({status: 'succes', message: `se han agregado ${users} usuarios y ${pets} mascotas`})


})

export default router
