import React from "react";
import "./table.css";
import { AiOutlineSortAscending } from "react-icons/ai";

export default function Table({ data, page, sort, sortbody }) {
  return (
    <table>
      <tr>
        <th>
          {page == "posts"
            ? "UserId"
            : page == "comments"
            ? "PostId"
            : "Username"}
        </th>
        <th>Id </th>
        <th>
          {page == "posts" ? "Title" : "Name"}
          <AiOutlineSortAscending
            onClick={() => {
              sort();
            }}
          />
        </th>
        <th>
          {page == "users" ? "Email" : "Body"}
          <AiOutlineSortAscending
            onClick={() => {
              sortbody();
            }}
          />
        </th>
      </tr>
      {data.map((ele) => {
        return (
          <tr
            style={{
              backgroundColor: ele.id % 2 === 0 ? "white" : "whitesmoke",
            }}
          >
            <td>
              {page == "posts"
                ? ele.userId
                : page == "comments"
                ? ele.postId
                : ele.username}
            </td>
            <td>{ele.id}</td>
            <td>{page == "posts" ? ele.title : ele.name}</td>
            <td>{page == "users" ? ele.email : ele.body}</td>
          </tr>
        );
      })}
    </table>
  );
}
