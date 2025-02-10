const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel')

//description Get user tickets
//router Get /api/tickets
//access Private


//Get user tickets
const getTickets = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  
  if(!user) {
    res.status(401)
    throw new Error('user not found')
  }

  const tickets = await Ticket.find({user: req.user.id});
      res.status(200).json(tickets);
});

//description Get user tickets by id
//router Get /api/tickets/:id
//access Private


//Get ticket by id
const getTicket = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  
  if(!user) {
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.findById(req.params.id);

  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if(ticket.user.toString() !== req.user.id ){
    res.status(401)
    throw new Error('Not Authorized')
  }
      res.status(200).json(ticket);
});


//description Get user tickets
//router Post /api/tickets
//access Private

//Create a new tickets
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;

    if(!product || !description) {
      res.status(400)
      throw new Error('Please add a product and description')
    }
  
    //Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  
  if(!user) {
    res.status(401)
    throw new Error('user not found')
  }
    const ticket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status: 'new'
    });

    const createdTicket = await ticket.save();

      res.status(201).json(ticket);
});

//description: Delete tickets by id
//router: DELETE /api/tickets/:id
//access: Private


//Delete ticket
const deleteTicket = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  
  if(!user) {
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.findById(req.params.id);

  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if(ticket.user.toString() !== req.user.id ){
    res.status(401)
    throw new Error('Not Authorized')
  }

    await ticket.deleteOne();
      res.status(200).json({success: true});
});

//description: Update tickets by id
//router: PUT /api/tickets/:id
//access: Private


//Get ticket by id
const updateTicket = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  
  if(!user) {
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.findById(req.params.id);

  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if(ticket.user.toString() !== req.user.id ){
    res.status(401)
    throw new Error('Not Authorized')
  }
  
  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id,
    req.body, { new: true }
  )

      res.status(200).json(updatedTicket);
});





module.exports = { getTickets, createTicket, getTicket, deleteTicket, updateTicket };
