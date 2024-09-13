import { useState } from "react";
import "./App.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Detail from "./routes/Detail.js";
import Card from "./routes/Card.js";
import About from "./routes/About.js";
import Event from "./routes/Event.js";
import axios from "axios";
import Cart from "./routes/Cart.js";

function App() {
  let [shoes, setShoes] = useState(data);
  let [moreBtnCnt, setMoreBtnCnt] = useState(2);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            ShoeShop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about/member");
              }}
            >
              about
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event/one");
              }}
            >
              event
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i} />;
                  })}
                </div>
              </div>
              <button
                onClick={(e) => {
                  if (moreBtnCnt > 3) {
                    alert("더 이상 준비된 상품이 없습니다.");
                    return false;
                  }
                  axios
                    .get(
                      "https://codingapple1.github.io/shop/data" +
                        moreBtnCnt +
                        ".json"
                    )
                    .then((result) => {
                      let copy = [...shoes, ...result.data];
                      setShoes(copy);
                      setMoreBtnCnt(moreBtnCnt + 1);
                    })
                    .catch((result) => {
                      console.log("실패");
                    });
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member</div>} />
          <Route path="location" element={<div>location</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>} />
          <Route path="two" element={<p>생일기념 쿠폰받기</p>} />
        </Route>

        <Route path="*" element={<div>404 pages</div>} />
      </Routes>
    </div>
  );
}

export default App;
