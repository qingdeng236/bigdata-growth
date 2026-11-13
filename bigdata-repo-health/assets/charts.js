(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var baseText = { color: muted, fontFamily: 'PlexMono, monospace', fontSize: 11 };

  function bar(id, cats, vals, horizontal, color) {
    var el = document.getElementById(id);
    if (!el) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    var axisCat = {
      type: 'category',
      data: cats,
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      axisLabel: Object.assign({}, baseText, { color: ink, fontSize: 11 })
    };
    var axisVal = {
      type: 'value',
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: baseText
    };
    chart.setOption({
      animation: false,
      tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } },
      grid: horizontal
        ? { left: 4, right: 40, top: 12, bottom: 8, containLabel: true }
        : { left: 8, right: 16, top: 16, bottom: 8, containLabel: true },
      xAxis: horizontal ? axisVal : axisCat,
      yAxis: horizontal ? axisCat : axisVal,
      series: [{
        type: 'bar',
        data: vals,
        barMaxWidth: horizontal ? 16 : 28,
        itemStyle: { color: color, borderRadius: horizontal ? [0, 3, 3, 0] : [3, 3, 0, 0] },
        label: {
          show: true,
          position: horizontal ? 'right' : 'top',
          color: muted,
          fontFamily: 'PlexMono, monospace',
          fontSize: 11
        }
      }]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  }

  // 图 1 · 模块文档数
  bar('chart-modules',
    ['bigdata/engine', 'bigdata/olap', 'bigdata/datalake', 'bigdata/mq', 'bigdata/store',
     'bigdata/hadoop', 'base', 'bigdata/collect', 'datawarehouse', 'bigdata/cache',
     'devops', 'strategy', '其他模块', '仓库根目录'],
    [50, 27, 23, 17, 12, 9, 8, 8, 7, 4, 3, 3, 9, 4],
    true, accent);

  // 图 2 · 文件类型
  var typeEl = document.getElementById('chart-types');
  if (typeEl) {
    var typeChart = echarts.init(typeEl, null, { renderer: 'svg' });
    typeChart.setOption({
      animation: false,
      tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c} 个 ({d}%)' },
      legend: {
        bottom: 0,
        icon: 'circle',
        textStyle: { color: muted, fontFamily: 'PlexMono, monospace', fontSize: 10 },
        itemWidth: 8, itemHeight: 8
      },
      series: [{
        type: 'pie',
        radius: ['46%', '70%'],
        center: ['50%', '44%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: bg2, borderWidth: 2 },
        label: { color: ink, fontFamily: 'PlexMono, monospace', fontSize: 11, formatter: '{b}\n{c}' },
        labelLine: { lineStyle: { color: rule } },
        data: [
          { value: 770, name: '图片', itemStyle: { color: accent } },
          { value: 217, name: 'Markdown', itemStyle: { color: accent2 } },
          { value: 50, name: 'XMind', itemStyle: { color: accent + '99' } },
          { value: 32, name: 'Shell', itemStyle: { color: accent2 + '99' } },
          { value: 76, name: '其他', itemStyle: { color: '#c9c4b8' } }
        ]
      }]
    });
    window.addEventListener('resize', function () { typeChart.resize(); });
  }

  // 图 3 · 深度文档 Top 10
  bar('chart-top',
    ['hudiWithFlink', 'TableSQLOverview', 'StreamSource源解析', 'Checkpoint机制',
     '剖析Spark源码', 'PaimonOnFlink', 'Spark存储体系', 'Spark计算引擎和Shuffle',
     'Spark调度系统', '数据结构'],
    [126, 101, 89, 84, 75, 62, 60, 57, 56, 49],
    true, accent2);

  // 图 4 · 断链分布（正文 118 处）
  bar('chart-broken',
    ['bigdata/engine', 'bigdata/datalake', 'bigdata/mq', 'bigdata/collect',
     'bigdata/store', 'base', 'bigdata/olap', 'bigdata/hadoop'],
    [71, 24, 7, 5, 4, 3, 2, 2],
    true, accent);
})();
