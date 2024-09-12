import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


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

  let [count, setCount] = useState(0);
  // let [alert, setAlert] = useState(true);
  let [text, setText] = useState('');
  let { id } = useParams();
  let 찾은상품 = props.shoes.find((x) => x.id == id);

  // useEffect(()=>{
  //   let timer = setTimeout(()=>{setAlert(false); setCount(count+1); console.log(count)}, 2000);
  //   return ()=>{clearTimeout(timer);}
    
  // },[]);

  useEffect(()=>{ 
    if (isNaN(text) == true){
      alert('그러지마세요');
    }
  }, [text]) 

  return (
    <div className="container">
      {/* {alert == true && (
        <div className="alert alert-warning">
          2초 이내 구매시 할인
        </div>
      )} */}
      <input type="text" onChange={(e)=>{setText(e.target.value)}}/>
      <div className="row">
        <div className="col-md-6">
          <img src={"/shoes" + id + ".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
export default Detail;
