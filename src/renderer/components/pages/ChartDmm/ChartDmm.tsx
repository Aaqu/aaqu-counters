import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';

import styles from './ChartDmm.module.css';
import { colors } from './colors';
import { Select } from '../../other/Select/Select';
import { options } from './options';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const ChartDmm = () => {
  const [data, setData] = useState({});
  const chartRef = useRef<ChartJS>(null);
  const legendRef = useRef(null);
  const [sampleOptions, setSampleOptions] = useState([]);

  function getData(e) {
    if (e.target.selectedIndex === 0) return;
    const target = e.target as typeof e.target & {
      value: string;
    };

    window.electron.ipcRenderer.sendMessage('dmm-chart', [
      { sample: target.value },
    ]);

    window.electron.ipcRenderer.once('dmm-chart', (args) => {
      const sets = args.datasets.map((dataset) => {
        return dataset.reduce((prev, curr, index, arr) => {
          if (index !== 0) {
            prev.push({
              x: arr[0],
              y: curr,
            });
          }
          return prev;
        }, []);
      });
      const transposed = sets[0].map((_, colIndex) =>
        sets.map((row) => row[colIndex])
      );

      const datasets = transposed.map((set, index) => {
        return {
          label: args.labels[index],
          data: set,
          borderColor: colors[index],
          borderWidth: 1,
          backgroundColor: colors[index],
          radius: 0,
        };
      });
      console.log({ datasets });

      const legend = legendRef.current;
      const buttons = Array.from(legend.querySelectorAll('button'));
      buttons.shift();
      buttons.forEach((button) => {
        button.classList.add(styles.pressed);
      });
      setData({ datasets });
      const chartElement = chartRef.current;
      if (Object.keys(data).length === 0) return;
      chartElement.data?.datasets?.map((_dataset, index) =>
        chartElement.setDatasetVisibility(index, true)
      );
    });
  }

  function hideAll() {
    const chartElement = chartRef.current;
    if (Object.keys(data).length === 0) return;
    chartElement.data.datasets.map((_dataset, index) =>
      chartElement.setDatasetVisibility(index, false)
    );
    const legend = legendRef.current;
    const buttons = Array.from(legend.querySelectorAll(`.${styles.pressed}`));
    console.log(buttons);
    buttons.forEach((button) => {
      button.classList.remove(styles.pressed);
    });
    chartElement.update();
  }

  function toggleDatasets(e, arr) {
    const chartElement = chartRef.current;
    if (Object.keys(data).length === 0) return;
    if (!e.target.classList.contains(styles.pressed)) {
      e.target.classList.add(styles.pressed);
      arr.forEach((id) => {
        chartElement.setDatasetVisibility(id, true);
      });
    } else {
      e.target.classList.remove(styles.pressed);
      arr.forEach((id) => {
        chartElement.setDatasetVisibility(id, false);
      });
    }
    chartElement.update();
  }

  function showVoltage(e) {
    toggleDatasets(e, [0, 1, 2]);
  }

  function showInterphase(e) {
    toggleDatasets(e, [3, 4, 5]);
  }

  function showCurrent(e) {
    toggleDatasets(e, [6, 7, 8]);
  }

  function showFrequency(e) {
    toggleDatasets(e, [9, 10, 11]);
  }

  function showActivePower(e) {
    toggleDatasets(e, [12, 13, 14, 15]);
  }

  function showReactivePower(e) {
    toggleDatasets(e, [16, 17, 18, 19]);
  }

  function showApparentPower(e) {
    toggleDatasets(e, [20, 21, 22, 23]);
  }

  function showCosPhi(e) {
    toggleDatasets(e, [24, 25, 26]);
  }

  function showPowerFactor(e) {
    toggleDatasets(e, [27, 28, 29, 30]);
  }

  function showActiveEnergyConsumed(e) {
    toggleDatasets(e, [31, 32, 33, 34]);
  }

  function showActiveEnergyReleased(e) {
    toggleDatasets(e, [35, 36, 37, 38]);
  }

  function showInductiveEnergy(e) {
    toggleDatasets(e, [39, 40, 41, 42]);
  }

  function showCapacitiveEnergy(e) {
    toggleDatasets(e, [43, 44, 45, 46]);
  }

  function showApparentEnergy(e) {
    toggleDatasets(e, [47, 48, 49, 50]);
  }

  function showThdv(e) {
    toggleDatasets(e, [51, 52, 53, 54]);
  }

  function showThdi(e) {
    toggleDatasets(e, [55, 56, 57, 58]);
  }

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('dmm-samples');

    window.electron.ipcRenderer.once('dmm-samples', (args) => {
      setSampleOptions(args);
    });
  }, []);

  function exportSample(e) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      sample: { value: string };
    };
    window.electron.ipcRenderer.sendMessage('dmm-export', [
      {
        sample: Number(target.sample.value),
      },
    ]);
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={exportSample}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="sample">Sample: </label>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <Select options={sampleOptions} onChange={getData} name="sample" />
          <button type="submit" className={styles.button}>
            Export
          </button>
        </form>
      </div>
      <div className={styles.legend} ref={legendRef}>
        <button type="button" className={styles.button} onClick={hideAll}>
          Ukryj wszystkie
        </button>
        <button type="button" className={styles.button} onClick={showVoltage}>
          Napięcie
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={showInterphase}
        >
          Napięcie międzyfazowe
        </button>
        <button type="button" className={styles.button} onClick={showCurrent}>
          Prąd
        </button>
        <button type="button" className={styles.button} onClick={showFrequency}>
          Częstotliowść
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={showActivePower}
        >
          Moc czynna
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={showReactivePower}
        >
          Moc bierna
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={showApparentPower}
        >
          Moc pozorna
        </button>
        <button type="button" className={styles.button} onClick={showCosPhi}>
          cosφ
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={showPowerFactor}
        >
          Współczynnik mocy
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={showActiveEnergyConsumed}
        >
          Energia czynna pobrana
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={showActiveEnergyReleased}
        >
          Energia czynna oddana
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={showInductiveEnergy}
        >
          Energia indukcyjna
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={showCapacitiveEnergy}
        >
          Energia pojemnościowa
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={showApparentEnergy}
        >
          Energia pozorna
        </button>
        <button type="button" className={styles.button} onClick={showThdv}>
          THDV
        </button>
        <button type="button" className={styles.button} onClick={showThdi}>
          THDI
        </button>
      </div>
      <div className={styles.chart}>
        {data.datasets?.length > 0 && (
          <Chart ref={chartRef} type="line" options={options} data={data} />
        )}
      </div>
    </>
  );
};
