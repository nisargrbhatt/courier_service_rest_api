const Courier = require("../models/courier");

exports.addOrder = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const order = new Courier({
    item_name: req.body.item_name,
    item_weight: req.body.item_weight,
    pickup_location: req.body.pickup_location,
    drop_location: req.body.drop_location,
    delivery_type: req.body.delivery_type,
    order_date: req.body.order_date,
    imagePath: url + "/images/" + req.file.filename,
    order_assigner: req.body.order_assigner,
    work_assigned: req.body.work_assigned,
    item_status: req.body.item_status,
  });
  console.log(order);
  order
    .save()
    .then((createdOrder) => {
      res.status(201).json({
        message: "Order Added Successfully.",
        post: {
          ...createdOrder,
          id: createdOrder._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Creation of a order failed." });
    });
};

exports.getOrder = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  // const userId = req.body.userId;
  const orderQuery = Courier.find({ order_assigner: req.userData.userId });
  let fetchedOrders;
  if (pageSize && currentPage) {
    orderQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  orderQuery
    .then((documents) => {
      fetchedOrders = documents;
      return Courier.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Orders fetched Successfully!",
        orders: fetchedOrders,
        maxOrders: count,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching orders failed!!",
      });
    });
};

exports.deleteOrder = (req, res, next) => {
  console.log(req.params.id);
  Courier.deleteOne({
    _id: req.params.id,
    order_assigner: req.userData.userId,
  })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Order Deleted.",
        });
      } else {
        res.status(401).json({
          message: "Not Authorized",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Deleting Order failed!!",
      });
    });
};
