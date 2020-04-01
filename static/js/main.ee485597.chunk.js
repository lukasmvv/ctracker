(this.webpackJsonpctracker=this.webpackJsonpctracker||[]).push([[0],{103:function(t,e,a){"use strict";a.r(e);var n=a(0),o=a.n(n),r=a(41),s=a.n(r),i=(a(53),a(42)),l=a.n(i),c=a(3),d=a(4),u=a(5),h=a(6),p=a(21),f=a.n(p),m=a(43),C=a.n(m),v=a(11),g=a.n(v),b=a(22),D=a.n(b),y=a(44),B=a.n(y),_=a(45);g.a.plugins.unregister(D.a);new _.Parser;var k=function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).chartRef=o.a.createRef(),n.state={type:"line",data:t.data,options:t.options},n}return Object(d.a)(a,[{key:"shouldComponentUpdate",value:function(t,e){return this.myChart.options=e.options,this.myChart.data=e.data,this.myChart.update(),!0}},{key:"componentDidMount",value:function(){this.myChart=new g.a(this.chartRef.current,{plugins:[D.a],type:"line",data:this.state.data,options:this.state.options})}},{key:"render",value:function(){return o.a.createElement("div",{className:B.a.LineChart},o.a.createElement("canvas",{ref:this.chartRef}))}}],[{key:"getDerivedStateFromProps",value:function(t,e){return{type:"line",data:t.data,options:t.options}}}]),a}(n.Component),x=function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).state={countries:t.countries,data:t.data,worldData:t.worldData,xLabels:t.xLabels,lineData:{labels:n.xLabels,datasets:[{label:"Confirmed Cases",data:[],pointBackgroundColor:"#42B3D5",pointBorderColor:"#42B3D5",pointRadius:0,backgroundColor:"#42B3D5",borderColor:"#42B3D5",fill:!1,datalabels:{display:!1}},{label:"Deaths",data:[],pointBackgroundColor:"#E4521B",pointBorderColor:"#E4521B",pointRadius:0,backgroundColor:"#E4521B",borderColor:"#E4521B",fill:!1,datalabels:{display:!1}},{label:"Recovered",data:[],pointBackgroundColor:"#E85285",pointBorderColor:"#E85285",pointRadius:0,backgroundColor:"#E85285",borderColor:"#E85285",fill:!1,datalabels:{display:!1}}]},lineOptions:{responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{scaleLabel:{display:!0,labelString:"Date",fontSize:25},type:"time",time:{parser:"YYYY-MM-DD",unit:"day",displayFormats:{hour:"HH:mm",day:"DD-MMM",month:"MMM-YY"}},ticks:{fontSize:15,autoSkip:!0,maxTickLimit:24},gridLines:{display:!1}}],yAxes:[{position:"left",scaleLabel:{display:!0,labelString:"Num Cases",fontSize:25},ticks:{beginAtZero:!0,min:0,stepSize:5e4},gridLines:{display:!0}}]},legend:{display:!0,labels:{fontSize:18}},title:{text:"World COVID-19 Cases",display:!0,fontSize:30,align:"start"}}},n}return Object(d.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{className:C.a.WorldChart},o.a.createElement(k,{data:this.state.lineData,options:this.state.lineOptions}))}}],[{key:"getDerivedStateFromProps",value:function(t,e){var a=e.lineData,n=e.lineOptions;return a.labels=t.xLabels,a.datasets[0].data=[],a.datasets[1].data=[],a.datasets[2].data=[],e.worldData.forEach((function(t,e){a.datasets[0].data.push(t.confirmed),a.datasets[1].data.push(t.deaths),a.datasets[2].data.push(t.recovered)})),{lineData:a,lineOptions:n}}}]),a}(n.Component),E=a(23),L=a(2),w=a.n(L),O=a(46),S=a.n(O),j=function(t){var e="#a5c9ec",a=[S.a.CountryButton];return t.active&&(e=t.color),o.a.createElement("button",{className:a.join(" "),style:{backgroundColor:e},onClick:function(e){return t.clicked(e)},value:t.country},t.country)},A=function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).countryClicked=function(t){var e=t.target.value,a=n.state.data[e],o=n.state.countries.indexOf(e),r=n.state.countriesActive,s=r[o],i=n.state.lineData.datasets;if(s){r[o]=!s;var l=[];i.forEach((function(t,a){t.label.includes(e)&&l.push(a)}));for(var c=l.length-1;c>-1;c--)i.splice(l[c],1)}else r[o]=!s,i.push({label:"".concat(e," Confirmed Cases"),data:a.map((function(t){return t.confirmed})),pointBackgroundColor:n.state.allColors[o],pointBorderColor:n.state.allColors[o],pointRadius:0,backgroundColor:n.state.allColors[o],borderColor:n.state.allColors[o],fill:!1,hidden:!0!==n.state.confirmed,datalabels:{anchor:"start",align:"left",offset:10,font:{size:20},formatter:function(t,n){var o="";return n.dataIndex===a.length-1&&(o="".concat(e,": ").concat(t," C")),o}}}),i.push({label:"".concat(e," Deaths"),data:a.map((function(t){return t.deaths})),pointBackgroundColor:n.state.allColors[o],pointBorderColor:n.state.allColors[o],pointRadius:0,backgroundColor:n.state.allColors[o],borderColor:n.state.allColors[o],fill:!1,hidden:!0!==n.state.deaths,datalabels:{anchor:"start",align:"left",offset:10,font:{size:20},formatter:function(t,n){var o="";return n.dataIndex===a.length-1&&(o="".concat(e,": ").concat(t," D")),o}}}),i.push({label:"".concat(e," Recovered"),data:a.map((function(t){return t.recovered})),pointBackgroundColor:n.state.allColors[o],pointBorderColor:n.state.allColors[o],pointRadius:0,backgroundColor:n.state.allColors[o],borderColor:n.state.allColors[o],fill:!1,hidden:!0!==n.state.recovered,datalabels:{anchor:"start",align:"left",offset:10,font:{size:20},formatter:function(t,n){var o="";return n.dataIndex===a.length-1&&(o="".concat(e,": ").concat(t," R")),o}}});var d={labels:n.props.xLabels,datasets:i};n.setState({lineData:d})},n.legendClick=function(t){var e,a=t.target.value.toLowerCase(),o=n.state.lineData.datasets,r=(o.slice(),!1);o.forEach((function(t,e){n.state[a]?t.label.toLowerCase().includes(a)&&(t.hidden=!0,r=!1):t.label.toLowerCase().includes(a)&&(t.hidden=!1,r=!0)})),n.setState((e={},Object(E.a)(e,a,r),Object(E.a)(e,"datasets",o),e))},n.state={countries:t.countries,countriesActive:t.countries.map((function(t){return!1})),data:t.data,lineData:{labels:t.xLabels,datasets:[]},lineOptions:{responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{scaleLabel:{display:!0,labelString:"Date",fontSize:25},type:"time",time:{parser:"YYYY-MM-DD",unit:"day",displayFormats:{hour:"HH:mm",day:"DD-MMM",month:"MMM-YY"}},ticks:{fontSize:15,autoSkip:!0,maxTickLimit:24},gridLines:{display:!1}}],yAxes:[{position:"left",scaleLabel:{display:!0,labelString:"Num Cases",fontSize:25},ticks:{beginAtZero:!0,min:0},gridLines:{display:!0}}]},legend:{display:!1,labels:{fontSize:18}},tooltips:{enabled:!0},title:{text:"Compare Cases",display:!0,fontSize:30,align:"start"}},confirmed:!0,deaths:!1,recovered:!1,allColors:t.countries.map((function(t){return!1})),colorsSet:!1},n}return Object(d.a)(a,[{key:"render",value:function(){var t=this,e=[w.a.LegendButton];this.state.confirmed||e.push(w.a.LegendButtonActive);var a=[w.a.LegendButton];this.state.deaths||a.push(w.a.LegendButtonActive);var n=[w.a.LegendButton];return this.state.recovered||n.push(w.a.LegendButtonActive),o.a.createElement("div",{className:w.a.CompareChart},o.a.createElement("div",{className:w.a.LegendButtons},o.a.createElement("button",{className:e.join(" "),value:"confirmed",onClick:function(e){return t.legendClick(e)}},"Confirmed Cases"),o.a.createElement("button",{className:a.join(" "),value:"deaths",onClick:function(e){return t.legendClick(e)}},"Deaths"),o.a.createElement("button",{className:n.join(" "),value:"recovered",onClick:function(e){return t.legendClick(e)}},"Recovered")),o.a.createElement("div",{className:w.a.Chart},o.a.createElement(k,{data:this.state.lineData,options:this.state.lineOptions})),o.a.createElement("div",{className:w.a.Buttons},this.state.countries.map((function(e,a){return o.a.createElement(j,{key:a,color:t.state.allColors[a],active:t.state.countriesActive[a],country:e,clicked:t.countryClicked})}))))}}],[{key:"getDerivedStateFromProps",value:function(t,e){var a=e.lineOptions,n=e.allColors,o=e.colorsSet;if(t.countries.length>0&&!1===o){n=[];for(var r=0;r<t.countries.length;r++)n.push("rgba(".concat(parseInt(255*Math.random()),", ").concat(parseInt(255*Math.random()),", ").concat(parseInt(255*Math.random()),", 1)"));o=!0}return{data:t.data,countries:t.countries,lineOptions:a,allColors:n,colorsSet:o}}}]),a}(n.Component),M=a(8),R=a.n(M),P=(a(47),function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).state={countries:t.countries,data:t.data,worldData:t.worldData},n}return Object(d.a)(a,[{key:"shouldComponentUpdate",value:function(t,e){return this.state.data!==[]&&this.state.countries!==[]&&this.state.worldData!==[]}},{key:"render",value:function(){var t=this;return o.a.createElement("div",null,o.a.createElement("h1",null,"World | ",this.state.worldData[this.state.worldData.length-1].confirmed," | ",this.state.worldData[this.state.worldData.length-1].deaths," | ",this.state.worldData[this.state.worldData.length-1].recovered),this.state.countries.map((function(e,a){var n=t.state.data[e],r=[];return n[n.length-1].confirmedPercentage<1?r.push(R.a.Button1):n[n.length-1].confirmedPercentage<5?r.push(R.a.Button5):n[n.length-1].confirmedPercentage<10?r.push(R.a.Button10):n[n.length-1].confirmedPercentage<15?r.push(R.a.Button15):n[n.length-1].confirmedPercentage<20&&r.push(R.a.Button20),o.a.createElement("button",{key:a,className:r.join(" ")},e," | ",n[n.length-1].confirmed," (",n[n.length-1].confirmedPercentage.toFixed(2),"%) | ",n[n.length-1].deaths," (",n[n.length-1].deathsPercentage.toFixed(2),"%) | ",n[n.length-1].recovered," (",n[n.length-1].recoveredPercentage.toFixed(2),"%)")})))}}],[{key:"getDerivedStateFromProps",value:function(t,e){return{countries:t.countries,data:t.data,worldData:t.worldData}}}]),a}(n.Component)),N=function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).state={data:[],countries:[],xLabels:[],worldData:[{confirmed:0,deaths:0,recovered:0}]},n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var t=this;fetch("https://pomber.github.io/covid19/timeseries.json").then((function(t){return t.json()})).then((function(e){return t.setState({data:e,countries:Object.keys(e).sort(),xLabels:e.Afghanistan.map((function(t){return t.date}))})}))}},{key:"render",value:function(){return o.a.createElement("div",{className:f.a.Data},o.a.createElement("h1",null,"Country|Confirmed|Deaths|Recovered"),o.a.createElement(P,{worldData:this.state.worldData,countries:this.state.countries,data:this.state.data}),o.a.createElement(x,{xLabels:this.state.xLabels,worldData:this.state.worldData,countries:this.state.countries,data:this.state.data}),o.a.createElement(A,{xLabels:this.state.xLabels,countries:this.state.countries,data:this.state.data}),o.a.createElement("p",{className:f.a.DataSource},"Data Source: https://github.com/pomber/covid19"))}}],[{key:"getDerivedStateFromProps",value:function(t,e){var a=e.worldData,n=e.data;return e.xLabels.forEach((function(t,n){var o=0,r=0,s=0;e.countries.forEach((function(t,a){var i=e.data[t];o+=i[n].confirmed,r+=i[n].deaths,s+=i[n].recovered})),a[n]={date:t,confirmed:o,deaths:r,recovered:s}})),e.xLabels.forEach((function(t,o){var r=a[o];e.countries.forEach((function(t,a){var s=e.data[t];n[t][o].confirmedPercentage=Math.round(1e4*s[o].confirmed/r.confirmed)/1e4*100,n[t][o].deathsPercentage=Math.round(1e4*s[o].deaths/r.deaths)/1e4*100,n[t][o].recoveredPercentage=Math.round(1e4*s[o].recovered/r.recovered)/1e4*100}))})),{worldData:a,data:n}}}]),a}(n.Component);var z=function(){return o.a.createElement("div",{className:l.a.App},o.a.createElement(N,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},2:function(t,e,a){t.exports={CompareChart:"CompareChart_CompareChart__1tq2Z",Buttons:"CompareChart_Buttons__29JT-",Chart:"CompareChart_Chart__24gdv",LegendButtons:"CompareChart_LegendButtons__2zh9-",LegendButton:"CompareChart_LegendButton__1iK6R",LegendButtonActive:"CompareChart_LegendButtonActive__uLRGM"}},21:function(t,e,a){t.exports={Data:"Data_Data__18bED",DataSource:"Data_DataSource__3RikH"}},42:function(t,e,a){t.exports={App:"App_App__2Vb1h"}},43:function(t,e,a){t.exports={WorldChart:"WorldChart_WorldChart__VnCNQ"}},44:function(t,e,a){t.exports={LineChart:"LineChart_LineChart__qDqIh"}},46:function(t,e,a){t.exports={CountryButton:"CountryButton_CountryButton__3AVAG",CountryButtonActive:"CountryButton_CountryButtonActive__cHIx4"}},47:function(t,e,a){t.exports={TextButton:"TextButton_TextButton__2O6vE"}},48:function(t,e,a){t.exports=a(103)},53:function(t,e,a){},8:function(t,e,a){t.exports={TextData:"TextData_TextData__xFaa0",Button:"TextData_Button__1uG1o",Button1:"TextData_Button1__2S3lG",Button5:"TextData_Button5__96lIP",Button10:"TextData_Button10__3IV42",Button15:"TextData_Button15__13AGC",Button20:"TextData_Button20__44wdt"}},93:function(t,e){}},[[48,1,2]]]);
//# sourceMappingURL=main.ee485597.chunk.js.map