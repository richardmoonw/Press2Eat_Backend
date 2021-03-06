const Payment = require('../models').Payment;
const Bill = require('../models').Bill;
const Restaurant = require('../models').Restaurant;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  index(req, res) {
    const customerId = req.query.customerId;
    const billId = req.query.billId;
    const filters = {};

    filters.customerId = customerId ? { customerId: customerId } : {}
    filters.billId = billId ? { billId: billId } : {}
    filters.all = !(customerId || billId) ? { id: { [Op.not]: null } } : {}

    Payment.findAll({
      where: {
        [Op.or]: [
          filters.customerId,
          filters.billId,
          filters.all
        ]
      },
      include: {
        model: Bill,
        attributes: { exclude: [ "id", "checkIn", "tip", "done", "paid", "paymentTime", "paymentReference", "customerId", "restaurantId", "tableNumber", "createdAt", "updatedAt" ]},
        include: {
          model: Restaurant,
          attributes: [ "name" ]
        }
      }
    })
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  },
  
  show(req, res) {
    const id = req.params.id;

    Payment.findByPk(id)
      .then(data => {
        if(data) res.status(200).send(data)
        else res.status(404).send({ message: `Cannot find the payment with the given id` })
      })
      .catch(_ => res.status(500).send({ message: `Error retrieving the payment with the id ${id}` }))
  },

  create(req, res) {
    const payment_attributes = req.body;

    Payment.create(payment_attributes)
      .then(payment => {
        Bill.update(
          {
            paid: true,
            paymentTime: payment_attributes.paymentDate,
            paymentReference: payment_attributes.referenceId
          },
          {
            where: {
              id: payment_attributes.billId
            }
          }
        )
          .then(_ => res.status(201).send(payment))
          .catch(error => res.status(422).send({ message: `There was an error updating the bill. Error details ${error}`}))
        
      })
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while creating the payment"
        })
      })
  },

  update(req, res) {
    const id = req.params.id;

    Payment.update(req.body, {
      where: { id: id },
      returning: true,
      plain: true
    })
      .then(data => res.status(200).send(data[1]))
      .catch(error => {
        res.status(422).send({
          message: error.message || "Some error occurred while updating the payment"
        })
      })
  }
}