/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState } from 'react';
import styles from './DonoutChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const textCenter = {
  id: 'textCenter',
  beforeDatasetsDraw(chart) {
    const { ctx, data } = chart;

    ctx.save();
    ctx.font = '1.8rem Arial';
    ctx.textStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(
      `+ $${data.datasets[0].total_incomes} in`,
      chart.getDatasetMeta(0).data[0].x,
      chart.getDatasetMeta(0).data[0].y
    );
    ctx.fillText(
      `- $${data.datasets[0].total_expenses} out`,
      chart.getDatasetMeta(0).data[0].x,
      chart.getDatasetMeta(0).data[0].y + 30
    );
    ctx.restore();
  },
};

export function DonoutChart({ data }) {
  const [currentTooltipTitle, setCurrentTooltipTitle] = useState(
    data.labels[0] + ': $' + data.datasets[0].data[0]
  );

  const options = {
    onHover: (event, elements) => {
      if (elements.length) {
        const index = elements[0].index;
        const label = data.labels[index];
        const value = data.datasets[0].data[index];
        setCurrentTooltipTitle(`${label}: $${value}`);
      } else {
        setCurrentTooltipTitle((previous) => {
          if (previous !== 'I') {
            return 'I';
          }
          return previous;
        });
      }
    },
    onClick: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'center',
        align: 'center',
      },
      title: {
        display: false,
        text: 'Chart.js Doughnut Chart',
      },
      tooltip: {
        enabled: false,
      },
    },
    spacing: 0,
    borderRadius: 6,
    cutout: '70%',
    hoverOffset: 5,
    // offset: 10,
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
    ],
  };

  return (
    <div className={styles.chart_box}>
      <Doughnut
        data={data}
        options={options}
        plugins={[textCenter]}
        className={styles.doughnut}
      />

      {currentTooltipTitle !== 'I' ? (
        <div
          className={styles.tooltip}
          style={{ backgroundColor: `${options.backgroundColor[1]}` }}
        >
          {currentTooltipTitle}
        </div>
      ) : (
        <div className={styles.tooltip_dum}>I</div>
      )}
    </div>
  );
}
