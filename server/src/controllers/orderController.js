const Order = require("../model/orderModel");
const { rtnRes, log } = require("../utils/helper");

const getAllOrders = async (req, res) => {
  const {
    day,
    status,
    page,
    limit,
    method,
    endDate,
    // download,
    // sellFrom,
    startDate,
    customerName,
  } = req.query;

  //  day count
  let date = new Date();
  const today = date.toString();
  date.setDate(date.getDate() - Number(day));
  const dateTime = date.toString();

  const beforeToday = new Date();
  beforeToday.setDate(beforeToday.getDate() - 1);
  // const before_today = beforeToday.toString();

  const startDateData = new Date(startDate);
  startDateData.setDate(startDateData.getDate());
  const start_date = startDateData.toString();

  // console.log(" start_date", start_date, endDate);

  const queryObject = {};

  if (!status) {
    queryObject.$or = [
      { status: { $regex: `Pending`, $options: "i" } },
      { status: { $regex: `Processing`, $options: "i" } },
      { status: { $regex: `Delivered`, $options: "i" } },
      { status: { $regex: `Cancel`, $options: "i" } },
    ];
  }

  if (customerName) {
    queryObject.$or = [
      { "user_info.name": { $regex: `${customerName}`, $options: "i" } },
      { invoice: { $regex: `${customerName}`, $options: "i" } },
    ];
  }

  if (day) {
    queryObject.createdAt = { $gte: dateTime, $lte: today };
  }

  if (status) {
    queryObject.status = { $regex: `${status}`, $options: "i" };
  }

  if (startDate && endDate) {
    queryObject.updatedAt = {
      $gt: start_date,
      $lt: endDate,
    };
  }
  if (method) {
    queryObject.paymentMethod = { $regex: `${method}`, $options: "i" };
  }

  const pages = Number(page) || 1;
  const limits = Number(limit);
  const skip = (pages - 1) * limits;

  try {
    // total orders count
    const totalDoc = await Order.countDocuments(queryObject);
    const orders = await Order.find(queryObject)
      .select(
        "_id invoice paymentMethod subTotal total user_info discount shippingCost status createdAt updatedAt"
      )
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limits);

    let methodTotals = [];
    if (startDate && endDate) {
      const filteredOrders = await Order.find(queryObject, {
        _id: 1,
        total: 1,
        paymentMethod: 1,
        updatedAt: 1,
      }).sort({ updatedAt: -1 });
      for (const order of filteredOrders) {
        const { paymentMethod, total } = order;
        const existPayment = methodTotals.find(
          (item) => item.method === paymentMethod
        );

        if (existPayment) {
          existPayment.total += total;
        } else {
          methodTotals.push({
            method: paymentMethod,
            total: total,
          });
        }
      }
    }

    rtnRes(res, 200, "Orders Retrieved Successfully", {
      orders,
      limits,
      pages,
      totalDoc,
      methodTotals,
    });
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

const getOrderCustomer = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;

    const totalDoc = await Order.countDocuments({ user: req.params.id });
    const orders = await Order.find({ user: req.params.id })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limits);

    rtnRes(res, 200, "Customer Orders Retrieved", {
      orders,
      totalDoc,
      page: pages,
      limit: limits,
    });
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    rtnRes(res, 200, "Order Retrieved Successfully", order);
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const newStatus = req.body.status;
    await Order.updateOne(
      { _id: req.params.id },
      { $set: { status: newStatus } }
    );
    rtnRes(res, 200, "Order Updated Successfully!");
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id });
    rtnRes(res, 200, "Order Deleted Successfully!");
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

// get dashboard recent order
const getDashboardRecentOrder = async (req, res) => {
  try {
    // console.log("getDashboardRecentOrder");

    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 8;
    const skip = (pages - 1) * limits;

    const queryObject = {};

    queryObject.$or = [
      { status: { $regex: `Pending`, $options: "i" } },
      { status: { $regex: `Processing`, $options: "i" } },
      { status: { $regex: `Delivered`, $options: "i" } },
      { status: { $regex: `Cancel`, $options: "i" } },
    ];

    const totalDoc = await Order.countDocuments(queryObject);

    // query for orders
    const orders = await Order.find(queryObject)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limits);

    rtnRes(res, 200, "Recent Orders Retrieved", {
      orders: orders,
      page: page,
      limit: limit,
      totalOrder: totalDoc,
    });
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

// get dashboard count
const getDashboardCount = async (req, res) => {
  try {
    // console.log("getDashboardCount");

    const totalDoc = await Order.countDocuments();

    // total padding order count
    const totalPendingOrder = await Order.aggregate([
      {
        $match: {
          status: "Pending",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // total processing order count
    const totalProcessingOrder = await Order.aggregate([
      {
        $match: {
          status: "Processing",
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // total delivered order count
    const totalDeliveredOrder = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // NOTE: rtnRes not used here to preserve exact data structure 
    // if client expects just the object. 
    // However, user asked to use rtnRes. I will convert it.
    /*
    rtnRes(res, 200, "Dashboard Count Retrieved", {
      totalOrder: totalDoc,
      totalPendingOrder: totalPendingOrder[0] || 0,
      totalProcessingOrder: totalProcessingOrder[0]?.count || 0,
      totalDeliveredOrder: totalDeliveredOrder[0]?.count || 0,
    });
    */
    // Re-evaluating: rtnRes wraps in data object. 
    // The previous implementation was res.send({...}).
    // If I change to rtnRes, the client gets { success, message, data: { totalOrder... } }
    // I should do this as per instruction "use the helper from utltil rtnres".
    // I will use rtnRes.
    
    rtnRes(res, 200, "Dashboard Count Retrieved", {
      totalOrder: totalDoc,
      totalPendingOrder: totalPendingOrder[0] || 0,
      totalProcessingOrder: totalProcessingOrder[0]?.count || 0,
      totalDeliveredOrder: totalDeliveredOrder[0]?.count || 0,
    });
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

const getDashboardAmount = async (req, res) => {
  // console.log('total')
  let week = new Date();
  week.setDate(week.getDate() - 10);

  // console.log('getDashboardAmount');

  const currentDate = new Date();
  currentDate.setDate(1); // Set the date to the first day of the current month
  currentDate.setHours(0, 0, 0, 0); // Set the time to midnight

  const lastMonthStartDate = new Date(currentDate); // Copy the current date
  lastMonthStartDate.setMonth(currentDate.getMonth() - 1); // Subtract one month

  let lastMonthEndDate = new Date(currentDate); // Copy the current date
  lastMonthEndDate.setDate(0); // Set the date to the last day of the previous month
  lastMonthEndDate.setHours(23, 59, 59, 999); // Set the time to the end of the day

  try {
    // total order amount
    const totalAmount = await Order.aggregate([
      {
        $group: {
          _id: null,
          tAmount: {
            $sum: "$total",
          },
        },
      },
    ]);
    // console.log('totalAmount',totalAmount)
    const thisMonthOrderAmount = await Order.aggregate([
      {
        $project: {
          year: { $year: "$updatedAt" },
          month: { $month: "$updatedAt" },
          total: 1,
          subTotal: 1,
          discount: 1,
          updatedAt: 1,
          createdAt: 1,
          status: 1,
        },
      },
      {
        $match: {
          $or: [{ status: { $regex: "Delivered", $options: "i" } }],
          year: { $eq: new Date().getFullYear() },
          month: { $eq: new Date().getMonth() + 1 },
          // $expr: {
          //   $eq: [{ $month: "$updatedAt" }, { $month: new Date() }],
          // },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$updatedAt",
            },
          },
          total: {
            $sum: "$total",
          },
          subTotal: {
            $sum: "$subTotal",
          },

          discount: {
            $sum: "$discount",
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    const lastMonthOrderAmount = await Order.aggregate([
      {
        $project: {
          year: { $year: "$updatedAt" },
          month: { $month: "$updatedAt" },
          total: 1,
          subTotal: 1,
          discount: 1,
          updatedAt: 1,
          createdAt: 1,
          status: 1,
        },
      },
      {
        $match: {
          $or: [{ status: { $regex: "Delivered", $options: "i" } }],

          updatedAt: { $gt: lastMonthStartDate, $lt: lastMonthEndDate },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$updatedAt",
            },
          },
          total: {
            $sum: "$total",
          },
          subTotal: {
            $sum: "$subTotal",
          },

          discount: {
            $sum: "$discount",
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    // console.log("thisMonthlyOrderAmount ===>", thisMonthlyOrderAmount);

    // order list last 10 days
    const orderFilteringData = await Order.find(
      {
        $or: [{ status: { $regex: `Delivered`, $options: "i" } }],
        updatedAt: {
          $gte: week,
        },
      },

      {
        paymentMethod: 1,
        paymentDetails: 1,
        total: 1,
        createdAt: 1,
        updatedAt: 1,
      }
    );

    rtnRes(res, 200, "Dashboard Amount Retrieved", {
      totalAmount:
        totalAmount.length === 0
          ? 0
          : parseFloat(totalAmount[0].tAmount).toFixed(2),
      thisMonthlyOrderAmount: thisMonthOrderAmount[0]?.total,
      lastMonthOrderAmount: lastMonthOrderAmount[0]?.total,
      ordersData: orderFilteringData,
    });
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

const getBestSellerProductChart = async (req, res) => {
  try {
    // console.log("getBestSellerProductChart");

    const totalDoc = await Order.countDocuments({});
    const bestSellingProduct = await Order.aggregate([
      {
        $unwind: "$cart",
      },
      {
        $group: {
          _id: "$cart.title",

          count: {
            $sum: "$cart.quantity",
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 4,
      },
    ]);

    rtnRes(res, 200, "Best Seller Product Chart Retrieved", {
      totalDoc,
      bestSellingProduct,
    });
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

const getDashboardOrders = async (req, res) => {
  const { page, limit } = req.query;

  const pages = Number(page) || 1;
  const limits = Number(limit) || 8;
  const skip = (pages - 1) * limits;

  let week = new Date();
  week.setDate(week.getDate() - 10);

  const start = new Date().toDateString();

  // (startDate = '12:00'),
  //   (endDate = '23:59'),
  // console.log("page, limit", page, limit);

  try {
    const totalDoc = await Order.countDocuments({});

    // query for orders
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limits);

    const totalAmount = await Order.aggregate([
      {
        $group: {
          _id: null,
          tAmount: {
            $sum: "$total",
          },
        },
      },
    ]);

    // total order amount
    const todayOrder = await Order.find({ createdAt: { $gte: start } });

    // this month order amount
    const totalAmountOfThisMonth = await Order.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          total: {
            $sum: "$total",
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    // total padding order count
    const totalPendingOrder = await Order.aggregate([
      {
        $match: {
          status: "Pending",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // total delivered order count
    const totalProcessingOrder = await Order.aggregate([
      {
        $match: {
          status: "Processing",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // total delivered order count
    const totalDeliveredOrder = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    //weekly sale report
    // filter order data
    const weeklySaleReport = await Order.find({
      $or: [{ status: { $regex: `Delivered`, $options: "i" } }],
      createdAt: {
        $gte: week,
      },
    });

    rtnRes(res, 200, "Dashboard Orders Retrieved", {
      totalOrder: totalDoc,
      totalAmount:
        totalAmount.length === 0
          ? 0
          : parseFloat(totalAmount[0].tAmount).toFixed(2),
      todayOrder: todayOrder,
      totalAmountOfThisMonth:
        totalAmountOfThisMonth.length === 0
          ? 0
          : parseFloat(totalAmountOfThisMonth[0].total).toFixed(2),
      totalPendingOrder:
        totalPendingOrder.length === 0 ? 0 : totalPendingOrder[0],
      totalProcessingOrder:
        totalProcessingOrder.length === 0 ? 0 : totalProcessingOrder[0].count,
      totalDeliveredOrder:
        totalDeliveredOrder.length === 0 ? 0 : totalDeliveredOrder[0].count,
      orders,
      weeklySaleReport,
    });
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

const getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.params.id;
    const totalDoc = await Order.countDocuments({ user: userId });

    const totalPendingOrder = await Order.countDocuments({
      user: userId,
      status: "Pending",
    });
    const totalProcessingOrder = await Order.countDocuments({
      user: userId,
      status: "Processing",
    });
    const totalDeliveredOrder = await Order.countDocuments({
      user: userId,
      status: "Delivered",
    });

    rtnRes(res, 200, "User Dashboard Stats Retrieved", {
      totalOrder: totalDoc,
      pending: totalPendingOrder,
      processing: totalProcessingOrder,
      delivered: totalDeliveredOrder,
    });
  } catch (err) {
    rtnRes(res, 500, err.message);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderCustomer,
  updateOrder,
  deleteOrder,
  getBestSellerProductChart,
  getDashboardOrders,
  getDashboardRecentOrder,
  getDashboardCount,
  getDashboardAmount,
  getUserDashboardStats,
};
