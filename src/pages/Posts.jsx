import { useEffect, useState } from "react";
import "./posts.css";
import { useDispatch, useSelector } from "react-redux";
import fetchedData from "../redux/Action";
import Table from "../components/Table";
import { Link } from "react-router-dom";

export default function Posts() {
  const [n, setN] = useState(10);
  const [m, setM] = useState(0);
  const dispatch = useDispatch();
  const [inp, setInp] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [option, setOption] = useState("id");
  const [fetchval, setFetchval] = useState("posts");
  const { postsdata } = useSelector((data) => data);
  const [sorts, setSorts] = useState(false);

  useEffect(() => {
    fetch(
      `http://jsonplaceholder.typicode.com/${fetchval}?_start=${m}&_end=${n}`
    )
      .then((res) => res.json())
      .then((fetchdata) => {
        dispatch(fetchedData(fetchdata));
      });
  }, [m, n, dispatch, fetchval, sorts]);

  const search = (val, attribute) => {
    const newlist = postsdata.filter((ele) => {
      return ele[attribute].includes(val);
    });
    setSearchData(newlist);
  };
  const searchwithId = (val) => {
    const newlist = postsdata.filter((ele) => {
      return ele.id == val;
    });
    setSearchData(newlist);
  };

  const sort = () => {
    setSorts(!sorts);
    if (sorts) {
      const newlist = postsdata.sort((a, b) => {
        let fa = a[fetchval === "posts" ? "title" : "name"].toLowerCase(),
          fb = b[fetchval === "posts" ? "title" : "name"].toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setSearchData(newlist);
    } else setSearchData(postsdata);
  };
  const sortbody = () => {
    setSorts(!sorts);
    if (sorts) {
      const newlist = postsdata.sort((a, b) => {
        let fa = a.body.toLowerCase(),
          fb = b.body.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setSearchData(newlist);
    } else setSearchData(postsdata);
  };

  const onClick = (a, b) => {
    setM(a);
    setN(b);
    setSearchData("");
    setInp("");
  };
  return (
    <div className="posts">
      <div className="header">
        <div className="header_inputbox">
          <select
            value={option}
            onChange={(e) => {
              setOption(e.target.value);
            }}
          >
            <option value="id">id</option>
            <option value={fetchval === "posts" ? "title" : "name"}>
              {fetchval === "posts" ? "title" : "name"}
            </option>
            <option value={fetchval === "users" ? "username" : "body"}>
              {fetchval === "users" ? "username" : "body"}
            </option>
          </select>
          <div className="inputbox">
            <input
              type="text"
              value={inp}
              onChange={(e) => {
                setInp(e.target.value);
              }}
              placeholder={`search ${option} based letters...`}
            />
            <button
              onClick={() => {
                if (
                  option === "title" ||
                  option === "body" ||
                  option === "name" ||
                  option === "username"
                )
                  search(inp, option);
                if (option === "id") searchwithId(inp);
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="pages">
          <Link to="/posts/users">
            <button
              onClick={() => {
                setFetchval("users");
                setM(0);
                setN(10);
              }}
            >
              Users
            </button>
          </Link>
          <Link to="/posts">
            <button
              onClick={() => {
                setFetchval("posts");
              }}
            >
              Posts
            </button>
          </Link>
          <Link to="/posts/comments">
            <button
              onClick={() => {
                setFetchval("comments");
              }}
            >
              Comments
            </button>
          </Link>
        </div>
      </div>
      <div className="table_data">
        <Table
          data={searchData.length > 0 ? searchData : postsdata}
          page={fetchval}
          sort={sort}
          sortbody={sortbody}
        ></Table>
      </div>
      <ul style={{ display: fetchval === "users" ? "none" : "flex" }}>
        <li
          onClick={() => {
            onClick(0, 10);
          }}
        >
          1
        </li>
        <li
          onClick={() => {
            onClick(10, 20);
          }}
        >
          2
        </li>
        <li
          onClick={() => {
            onClick(20, 30);
          }}
        >
          3
        </li>
        <li
          onClick={() => {
            onClick(30, 40);
          }}
        >
          4
        </li>
        <li
          onClick={() => {
            onClick(40, 50);
          }}
        >
          5
        </li>
        <li
          onClick={() => {
            onClick(50, 60);
          }}
        >
          6
        </li>
        <li
          onClick={() => {
            onClick(60, 70);
          }}
        >
          7
        </li>
        <li
          onClick={() => {
            onClick(70, 80);
          }}
        >
          8
        </li>
        <li
          onClick={() => {
            onClick(80, 90);
          }}
        >
          9
        </li>
        <li
          onClick={() => {
            onClick(90, 100);
          }}
        >
          10
        </li>
      </ul>
    </div>
  );
}
