var express = require("express");
var mysql = require("./dbcon.js");

var app = express();
var handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.set("port", process.argv[2]);
app.set("mysql", mysql);

//renders the home page!
app.get("/", function(req, res) {
  res.render("home.handlebars");
});

//renders the Accessories page and pulls all backend information that we require
app.get("/Accessories", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    'SELECT productID, prodName, price, inStock FROM products WHERE productType="Accessories"',
    function(err, rows, results) {
      if (err) {
        next(err);
        return;
      }

      var prodList = [];
      for (var i in rows) {
        prodList.push({
          productID: rows[i].productID,
          prodName: rows[i].prodName,
          price: rows[i].price,
          inStock: rows[i].inStock
        });
      }

      context.prodList = prodList;
      res.render("Accessories", context);
    }
  );
});

//renders the Software page and pulls all backend information that we require
app.get("/Software", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    'SELECT productID, prodName, price, inStock FROM products WHERE productType="Software"',
    function(err, rows, results) {
      if (err) {
        next(err);
        return;
      }

      var prodList = [];
      for (var i in rows) {
        prodList.push({
          productID: rows[i].productID,
          prodName: rows[i].prodName,
          price: rows[i].price,
          inStock: rows[i].inStock
        });
      }

      context.prodList = prodList;
      res.render("Software", context);
    }
  );
});

//renders the Parts page and pulls all backend information that we require
app.get("/Parts", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    'SELECT productID, prodName, price, inStock FROM products WHERE productType="Parts"',
    function(err, rows, results) {
      if (err) {
        next(err);
        return;
      }

      var prodList = [];
      for (var i in rows) {
        prodList.push({
          productID: rows[i].productID,
          prodName: rows[i].prodName,
          price: rows[i].price,
          inStock: rows[i].inStock
        });
      }

      context.prodList = prodList;
      res.render("Parts", context);
    }
  );
});

//renders the Admin page and pulls all backend information that we require to build the tables!
app.get("/Admin", function(req, res) {
  var context = {};
  mysql.pool.query("SELECT * FROM customers", function(err, rows, results) {
    if (err) {
      next(err);
      return;
    }

    var admin_customers = [];
    for (var i in rows) {
      admin_customers.push({
        custID: rows[i].customerID,
        email: rows[i].email,
        payment: rows[i].paymentTypes,
        address: rows[i].address,
        phone: rows[i].phoneNumber,
        password: rows[i].password,
        mailingList: rows[i].mailingList
      });
    }

    context.admin_customers = admin_customers;
    mysql.pool.query("SELECT * FROM products", function(err, rows, results) {
      var product_list = [];
      for (var j in rows) {
        product_list.push({
          prodID: rows[j].productID,
          price: rows[j].price,
          inStock: rows[j].inStock,
          type: rows[j].productType,
          vendor: rows[j].vendorID,
          name: rows[j].prodName
        });
      }
      context.product_list = product_list;
      res.render("Admin", context);
    });
  });
});

//renders admin the del-cus allows us to delete a customer!
app.get("/del-cus", function(req, res, next) {
  mysql.pool.query(
    "DELETE FROM orders WHERE customerID=?",
    [req.query.id],
    function(err, result) {
      mysql.pool.query(
        "DELETE FROM customers WHERE customerID=?",
        [req.query.id],
        function(err, result) {
          if (err) {
            next(err);
            return;
          }
          console.log("Received request");
          res.render("Admin");
        }
      );
    }
  );
});

//renders admin the del-pro allows us to delete a product!
app.get("/del-pro", function(req, res, next) {
  mysql.pool.query(
    "DELETE FROM oders WHERE productID=?",
    [req.query.id],
    function(err, result) {
      mysql.pool.query(
        "DELETE FROM products WHERE productID=?",
        [req.query.id],
        function(err, result) {
          if (err) {
            next(err);
            return;
          }
          console.log("Received request");
          res.render("Admin");
        }
      );
    }
  );
});

//renders Orders the del-pro allows us to delete a order!
app.get("/del-order", function(req, res, next) {
  mysql.pool.query(
    "DELETE FROM orders WHERE orderID=?",
    [req.query.id],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
      console.log("Received request");
      res.render("Orders");
    }
  );
});

//renders admin with updated page!
app.post("/update", function(req, res, next) {
  console.log("edit req.body", req.body);
  var context = {};
  phone = parseInt(req.body.phone);
  console.log(isNaN(phone));
  mysql.pool.query(
    "UPDATE customers SET email=?, password=?, paymentTypes=?, address=?, phoneNumber=?, mailingList=? WHERE customerID=?",
    [
      req.body.email,
      req.body.password,
      req.body.paymentMethod,
      req.body.address,
      phone,
      req.body.mail_list,
      req.body.id
    ],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
    }
  );
  res.redirect("Admin");
});

//renders admin with updated product!
app.post("/up-prod", function(req, res, next) {
  console.log("edit req.body", req.body);
  var context = {};
  mysql.pool.query(
    "UPDATE products SET price=?, inStock=?, productType=?, vendorID=?, prodName=? WHERE productID=?",
    [
      req.body.price,
      req.body.inStock,
      req.body.type,
      req.body.vendor,
      req.body.name,
      req.body.id
    ],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
    }
  );
  res.redirect("Admin");
});

//renders the edit page with infomormation we rq for editing a customer!
app.get("/edit", function(req, res, next) {
  let context = {};
  mysql.pool.query(
    "SELECT * FROM customers WHERE customerID=?",
    [req.query.id],
    function(err, rows, result) {
      if (err) {
        next(err);
        return;
      }

      let custList = [];
      for (let i in rows) {
        custList.push({
          custID: rows[i].customerID,
          email: rows[i].email,
          payment: rows[i].paymentTypes,
          address: rows[i].address,
          phone: rows[i].phoneNumber,
          password: rows[i].password,
          mailingList: rows[i].mailingList
        });
      }

      context.list = custList[0];
      res.render("edit", context);
    }
  );
});

//renders the ed-prod page with infomormation we rq for editing a product!
app.get("/ed-prod", function(req, res, next) {
  let context = {};
  mysql.pool.query(
    "SELECT * FROM products WHERE productID=?",
    [req.query.id],
    function(err, rows, result) {
      if (err) {
        next(err);
        return;
      }

      let prodList = [];
      for (let i in rows) {
        prodList.push({
          prodID: rows[i].productID,
          price: rows[i].price,
          inStock: rows[i].inStock,
          type: rows[i].productType,
          vendor: rows[i].vendorID,
          name: rows[i].prodName
        });
      }

      context.list = prodList[0];
      res.render("ed-prod", context);
    }
  );
});

//renders the ed-order page with infomormation we rq for editing a order!
app.get("/ed-order", function(req, res, next) {
  let context = {};
  mysql.pool.query(
    "SELECT * FROM orders WHERE orderID=?",
    [req.query.id],
    function(err, rows, result) {
      if (err) {
        next(err);
        return;
      }

      let orderList = [];
      for (let i in rows) {
        orderList.push({
          ordID: rows[i].orderID,
          custID: rows[i].customerID,
          shipID: rows[i].shipperID,
          prodID: rows[i].productID,
          quantity: rows[i].quantity
        });
      }

      context.list = orderList[0];
      res.render("ed-order", context);
    }
  );
});

//renders the up-order page with infomormation we rq for updating a order!
app.post("/up-order", function(req, res, next) {
  console.log("edit req.body", req.body);
  var context = {};
  mysql.pool.query(
    "UPDATE orders SET customerID=?, shipperID=?, productID=?, quantity=? WHERE orderID=?",
    [
      req.body.custID,
      req.body.shipID,
      req.body.prodID,
      req.body.quantity,
      req.body.id
    ],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
    }
  );
  res.redirect("Orders");
});

//renders the new-prod gives infomormation we rq for updating a new product!
app.post("/new-prod", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    "INSERT INTO products (`price`, `inStock`, `productType`, `vendorID`, `prodName`) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.price,
      req.body.inStock,
      req.body.productType,
      req.body.vendor,
      req.body.name
    ],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
      context.id = result.insertId;
      res.redirect("/Admin");
    }
  );
});

//renders the Orders gives infomormation we need for the orders page to render with database!
app.get("/Orders", function(req, res) {
  var context = {};
  mysql.pool.query(
    "SELECT orderID, customerID, shipperID, productID,quantity FROM orders",
    function(err, rows, results) {
      if (err) {
        next(err);
        return;
      }

      var product_list = [];
      for (var i in rows) {
        product_list.push({
          orderID: rows[i].orderID,
          customerID: rows[i].customerID,
          shipperID: rows[i].shipperID,
          productID: rows[i].productID,
          quantity: rows[i].quantity
        });
      }

      context.product_list = product_list;
      res.render("Orders", context);
    }
  );
});

//renders the parts page
app.get("/Parts", function(req, res) {
  var context = {};
  context.Author = "homes";
  res.render("Parts", context);
});
//renders the register page
app.get("/register", function(req, res) {
  var context = [];
  context.Author = "homes";
  res.render("register", context);
});
//renders the Account page
app.get("/Account", function(req, res) {
  var grabparamater = [];
  for (var paramter in req.query) {
    grabparamater.push({ Key: paramter, Value: req.query[paramter] });
  }
  console.log(grabparamater);
  var mycontent = {};
  mycontent.dataset = grabparamater;
  res.render("Account", mycontent);
});

// login is a work in progress, NOT FINISHED
app.get("/login", function(req, res) {
  mysql.pool.query(
    "SELECT id FROM customers WHERE email=?, password=?",
    [req.email, req.password],
    function(error, result, fields) {
      if (error) {
        next(error);
        return;
      }
      req.login(result, function(result) {
        res.redirect("/");
      });
    }
  );
});

//renders a new user!
app.post("/new-user", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    "INSERT INTO customers (`email`, `password`, `address`, `phoneNumber`, `paymentTypes`, `mailingList`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      req.body.email,
      req.body.password,
      req.body.address,
      req.body.phone,
      req.body.payment,
      req.body.mail_list
    ],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
      context.id = result.insertId;
      res.redirect("/");
    }
  );
});
//renders a new user! via the admin (renders out the admin page)
app.post("/new-user-admin", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    "INSERT INTO customers (`email`, `password`, `address`, `phoneNumber`, `paymentTypes`, `mailingList`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      req.body.email,
      req.body.password,
      req.body.address,
      req.body.phone,
      req.body.payment,
      req.body.mail_list
    ],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
      context.id = result.insertId;
      res.redirect("/Admin");
    }
  );
});
//creates a new order and renders out the orders page
app.post("/new-order", function(req, res, next) {
  var context = {};
  mysql.pool.query(
    "INSERT INTO orders (`customerID`,`shipperID`,`productID`,`quantity`) VALUES (?, ?, ?, ?)",
    [req.body.custID, req.body.shipID, req.body.prodID, req.body.quantity],
    function(err, result) {
      if (err) {
        next(err);
        return;
      }
      res.redirect("/Orders");
    }
  );
});

app.post("/post-data", function(req, res) {
  var queryparamaters = [];
  var bodyparameters = [];
  for (var paramter in req.query) {
    queryparamaters.push({ Key: paramter, Value: req.query[paramter] });
  }
  for (var paramter in req.body) {
    bodyparameters.push({ Key: paramter, Value: req.body[paramter] });
  }

  var mycontent = {};
  mycontent.queryset = queryparamaters;
  mycontent.bodyset = bodyparameters;
  res.render("post-data", mycontent);
});

app.use(function(req, res) {
  res.status(404);
  res.render("404");
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
