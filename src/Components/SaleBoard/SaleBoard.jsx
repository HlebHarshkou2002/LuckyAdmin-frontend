import React from "react";
import s from "./SaleBoard.module.scss";
import { InfoCircleOutlined } from "@ant-design/icons";

import CountUp from "react-countup";
import { Col, Row, Statistic } from "antd";

import { Typography } from "antd";
import { Button, Popover } from "antd";

const formatter = (value) => <CountUp end={value} separator="," />;
const { Title } = Typography;

function SaleBoard(props) {
  const content = (
    <div>
      <p>{props.info}</p>
    </div>
  );
  return (
    <div className={s.board__block}>
      <div className={s.board__icon}>{props.boardImg}</div>

      {/* <p className={s.board__index}>
                <Col span={12}>
                    <Statistic title="" value={props.value}/>
                </Col>
                {props.calculation}
            </p> */}
      <p className={s.board__index}>
        {props.value} {props.calculation}
      </p>
      <Title level={5} type="secondary" className={s.board__title}>
        {props.title}
      </Title>
      <div className={s.info__icon}>
        <Popover content={content} title={props.infoTitle}>
          <InfoCircleOutlined style={{ fontSize: "30px" }} />
        </Popover>
      </div>
    </div>
  );
}

export default SaleBoard;
