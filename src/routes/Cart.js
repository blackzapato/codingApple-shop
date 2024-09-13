import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function Cart() {
  let { cartStock } = useSelector((state) => state);
  console.log(cartStock);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cartStock.map((item, idx) => {
            return (
              <tr>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
