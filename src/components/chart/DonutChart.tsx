import { Grid, Paper, Typography } from "@mui/material";
import { Cell, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

export interface DataDonut {
  name: string;
  value: number;
  color: string;
}

interface Props {
  title: string;
  data: Array<DataDonut>;
  buttons?: JSX.Element;
}

export const DonutChart = ({ data, title, buttons }: Props) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h2">{title}</Typography>
        </Grid>
        {buttons && (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            {buttons}
          </Grid>
        )}
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
      {`${value} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};
