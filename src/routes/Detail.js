import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {addCount, addCart} from './../store.js'

function Detail(props) {
  // 1. 이러면 재렌더링마다 코드를 실행가능합니다.
  // useEffect(()=>{ 실행할코드 })

  // 2. 이러면 컴포넌트 mount시 (로드시) 1회만 실행가능합니다.
  // useEffect(()=>{ 실행할코드 }, [])

  // 3. 이러면 useEffect 안의 코드 실행 전에 항상 실행됩니다.
  // useEffect(()=>{
  //   return ()=>{
  //     실행할코드
  //   }
  // })

  // 4. 이러면 컴포넌트 unmount시 1회 실행됩니다.
  // useEffect(()=>{
  //   return ()=>{
  //     실행할코드
  //   }
  // }, [])

  // 5. 이러면 state1이 변경될 때만 실행됩니다.
  // useEffect(()=>{
  //   실행할코드
  // }, [state1])

  // let [text, setText] = useState("");
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let { id } = useParams();
  let findPrdt = props.shoes.find((x) => x.id == id);
  let [custmTab, setcustmTab] = useState(0);
  let [detailFade, setDetailFade] = useState("");
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
      setCount(count + 1);
    }, 2000);

    let tempTimer = setTimeout(() => {
      setDetailFade("end");
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(tempTimer);
      setDetailFade("");
    };
  }, []);

  // useEffect(() => {
  //   if (isNaN(text) == true) {
  //     alert("그러지마세요");
  //   }
  // }, [text]);

  return (
    <div className={`container start ${detailFade}`}>
      {alert == true && (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      )}
      {/* <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
      /> */}
      <div className="row">
        <div className="col-md-6">
          <img src={"/shoes" + (Number(id) + 1) + ".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findPrdt.title}</h4>
          <p>{findPrdt.content}</p>
          <p>{findPrdt.price}</p>
          <button className="btn btn-danger" onClick={()=>{

            if(state.cartStock.findIndex(v => v.id == findPrdt.id) > -1){
              dispatch(addCount(findPrdt.id));
            }
            else{
              let data = {id: findPrdt.id, name: findPrdt.title, count: 1};
              dispatch(addCart(data));
            }

            }}>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setcustmTab(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setcustmTab(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setcustmTab(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent custmTab={custmTab} shoes={props.shoes} />
    </div>
  );
}
function TabContent({ custmTab, shoes }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    let tempTimer = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout(tempTimer);
      setFade("");
    };
  }, [custmTab]);

  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][custmTab]}
    </div>
  );

  // if (custmTab === 0) {
  //   return <div>내용0</div>;
  // }
  // if (custmTab === 1) {
  //   return <div>내용1</div>;
  // }
  // if (custmTab === 2) {
  //   return <div>내용2</div>;
  // }
}
export default Detail;
