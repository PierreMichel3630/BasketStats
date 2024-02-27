import { Grid, Paper, Typography } from "@mui/material";
import { padding, px } from "csx";
import { useContext } from "react";
import { Cell, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";
import { UserContext } from "src/App";
import { isInt } from "src/utils/calcul";
import { ToogleButtonTotal } from "../ToogleButton";

export interface DataDonut {
  name: string;
  value: number;
  color: string;
}

interface Props {
  title: string;
  dataAverage: Array<DataDonut>;
  dataTotal: Array<DataDonut>;
}

export const DonutChart = ({ dataAverage, dataTotal, title }: Props) => {
  const { total, setTotal } = useContext(UserContext);
  const isTypeMoy = !total;

  const data = isTypeMoy ? dataAverage : dataTotal;
  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", bgcolor: "background.paper" }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            bgcolor: "primary.main",
            p: padding(px(2), px(8)),
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" color="white" textTransform="uppercase">
            {title}
          </Typography>
          <ToogleButtonTotal
            value={total ? "total" : "pergame"}
            onChange={(value) => setTotal(value === "total")}
          />
        </Grid>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                stroke="none"
                innerRadius={50}
                outerRadius={120}
                paddingAngle={5}
                cornerRadius={5}
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {data.map((el, index) => (
                  <Cell key={`cell-${index}`} fill={el.color} />
                ))}
                <LabelList
                  dataKey="name"
                  position="outside"
                  fontSize={18}
                  fontWeight={700}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const valueText = isInt(value) ? value : value.toFixed(1);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontWeight={700}
      fontSize={16}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${valueText} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};
