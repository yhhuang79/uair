var express = require('express');
//var fileUpload = require('express-fileupload');
var router = express.Router();
//var app = express();
// default options
//app.use(fileUpload());

var array = require('array');

// Static data
var airstation = array();
airstation = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[120.409653,23.925175000700026]},"properties":{"SiteName":"二林","SiteEngNam":"Erlin","AreaName":"中部空品區","County":"彰化縣","Township":"二林鎮","SiteAddres":"彰化縣二林鎮萬合里江山巷1號","TWD97Lon":"120.40965300000","TWD97Lat":"23.92517500000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.493806,25.072611000724766]},"properties":{"SiteName":"三重","SiteEngNam":"Sanchong","AreaName":"北部空品區","County":"新北市","Township":"三重區","SiteAddres":"新北市三重區三和路重陽路交口","TWD97Lon":"121.49380600000","TWD97Lat":"25.07261100000","SiteType":"交通測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.758833,24.38294200071003]},"properties":{"SiteName":"三義","SiteEngNam":"Sanyi","AreaName":"竹苗空品區","County":"苗栗縣","Township":"三義鄉","SiteAddres":"苗栗縣三義鄉西湖村上湖61-1號","TWD97Lon":"120.75883300000","TWD97Lat":"24.38294200000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.451861,24.982528000722873]},"properties":{"SiteName":"土城","SiteEngNam":"Tucheng","AreaName":"北部空品區","County":"新北市","Township":"土城區","SiteAddres":"新北市土城區學府路一段241號","TWD97Lon":"121.45186100000","TWD97Lat":"24.98252800000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.515389,25.10541700072546]},"properties":{"SiteName":"士林","SiteEngNam":"Shilin","AreaName":"北部空品區","County":"臺北市","Township":"北投區","SiteAddres":"臺北市北投區文林北路155號","TWD97Lon":"121.51538900000","TWD97Lat":"25.10541700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.513311,25.063200000724578]},"properties":{"SiteName":"大同","SiteEngNam":"Datong","AreaName":"北部空品區","County":"臺北市","Township":"大同區","SiteAddres":"臺北市大同區重慶北路三段2號","TWD97Lon":"121.51331100000","TWD97Lat":"25.06320000000","SiteType":"交通測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.677689,24.099611000703863]},"properties":{"SiteName":"大里","SiteEngNam":"Dali","AreaName":"中部空品區","County":"臺中市","Township":"大里區","SiteAddres":"臺中市大里區大新街36號","TWD97Lon":"120.67768900000","TWD97Lat":"24.09961100000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.201811,25.06034400072451]},"properties":{"SiteName":"大園","SiteEngNam":"Dayuan","AreaName":"北部空品區","County":"桃園市","Township":"大園區","SiteAddres":"桃園市大園區中正東路160號","TWD97Lon":"121.20181100000","TWD97Lat":"25.06034400000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.425081,22.565747000669244]},"properties":{"SiteName":"大寮","SiteEngNam":"Daliao","AreaName":"高屏空品區","County":"高雄市","Township":"大寮區","SiteAddres":"高雄市大寮區潮寮路61號","TWD97Lon":"120.42508100000","TWD97Lat":"22.56574700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.337736,22.565833000669233]},"properties":{"SiteName":"小港","SiteEngNam":"Xiaogang","AreaName":"高屏空品區","County":"高雄市","Township":"小港區","SiteAddres":"高雄市小港區平和南路185號","TWD97Lon":"120.33773600000","TWD97Lat":"22.56583300000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.526528,25.062361000724557]},"properties":{"SiteName":"中山","SiteEngNam":"Zhongshan","AreaName":"北部空品區","County":"臺北市","Township":"中山區","SiteAddres":"臺北市中山區林森北路511號","TWD97Lon":"121.52652800000","TWD97Lat":"25.06236100000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.221667,24.953278000722257]},"properties":{"SiteName":"中壢","SiteEngNam":"Zhongli","AreaName":"北部空品區","County":"桃園市","Township":"中壢區","SiteAddres":"桃園市中壢區延平路622號","TWD97Lon":"121.22166700000","TWD97Lat":"24.95327800000","SiteType":"交通測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.332631,22.6890560006721]},"properties":{"SiteName":"仁武","SiteEngNam":"Renwu","AreaName":"高屏空品區","County":"高雄市","Township":"仁武區","SiteAddres":"高雄市仁武區八卦里永仁街555號","TWD97Lon":"120.33263100000","TWD97Lat":"22.68905600000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.544994,23.711853000695292]},"properties":{"SiteName":"斗六","SiteEngNam":"Douliu","AreaName":"雲嘉南空品區","County":"雲林縣","Township":"斗六市","SiteAddres":"雲林縣斗六市民生路224號","TWD97Lon":"120.54499400000","TWD97Lat":"23.71185300000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.792928,24.63220300071541]},"properties":{"SiteName":"冬山","SiteEngNam":"Dongshan","AreaName":"宜蘭空品區","County":"宜蘭縣","Township":"冬山鄉","SiteAddres":"宜蘭縣冬山鄉南興村照安路26號","TWD97Lon":"121.79292800000","TWD97Lat":"24.63220300000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.529556,25.02060800072367]},"properties":{"SiteName":"古亭","SiteEngNam":"Guting","AreaName":"北部空品區","County":"臺北市","Township":"大安區","SiteAddres":"臺北市大安區羅斯福路三段153號","TWD97Lon":"121.52955600000","TWD97Lat":"25.02060800000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.292917,22.674861000671765]},"properties":{"SiteName":"左營","SiteEngNam":"Zuoying","AreaName":"高屏空品區","County":"高雄市","Township":"左營區","SiteAddres":"高雄市左營區翠華路687號","TWD97Lon":"120.29291700000","TWD97Lat":"22.67486100000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.203986,24.952786000722238]},"properties":{"SiteName":"平鎮","SiteEngNam":"Pingzhen","AreaName":"北部空品區","County":"桃園市","Township":"平鎮區","SiteAddres":"桃園市平鎮區文化街189號","TWD97Lon":"121.20398600000","TWD97Lat":"24.95278600000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.516306,25.0170000007236]},"properties":{"SiteName":"永和","SiteEngNam":"Yonghe","AreaName":"北部空品區","County":"新北市","Township":"永和區","SiteAddres":"新北市永和區永和路光復路交口","TWD97Lon":"121.51630600000","TWD97Lat":"25.01700000000","SiteType":"交通測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.2175,23.048197000680332]},"properties":{"SiteName":"安南","SiteEngNam":"Annan","AreaName":"雲嘉南空品區","County":"臺南市","Township":"安南區","SiteAddres":"臺南市安南區安和路三段193號","TWD97Lon":"120.21750000000","TWD97Lat":"23.04819700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.24735,23.46530800068978]},"properties":{"SiteName":"朴子","SiteEngNam":"Puzi","AreaName":"雲嘉南空品區","County":"嘉義縣","Township":"朴子市","SiteAddres":"嘉義縣朴子市光復路34號","TWD97Lon":"120.24735000000","TWD97Lat":"23.46530800000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.6423,25.067131000724654]},"properties":{"SiteName":"汐止","SiteEngNam":"Xizhi","AreaName":"北部空品區","County":"新北市","Township":"汐止區","SiteAddres":"新北市汐止區樟樹一路141巷2號","TWD97Lon":"121.64230000000","TWD97Lat":"25.06713100000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.677306,23.75638900069629]},"properties":{"SiteName":"竹山","SiteEngNam":"Zhushan","AreaName":"中部空品區","County":"南投縣","Township":"竹山鎮","SiteAddres":"南投縣竹山鎮大明路666號","TWD97Lon":"120.67730600000","TWD97Lat":"23.75638900000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.088903,24.740644000717722]},"properties":{"SiteName":"竹東","SiteEngNam":"Zhudong","AreaName":"竹苗空品區","County":"新竹縣","Township":"竹東鎮","SiteAddres":"新竹縣竹東鎮榮樂里三民街70號","TWD97Lon":"121.08890300000","TWD97Lat":"24.74064400000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.616917,24.162197000705234]},"properties":{"SiteName":"西屯","SiteEngNam":"Xitun","AreaName":"中部空品區","County":"臺中市","Township":"西屯區","SiteAddres":"臺中市西屯區安和路1號","TWD97Lon":"120.61691700000","TWD97Lat":"24.16219700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.568794,24.22562800070661]},"properties":{"SiteName":"沙鹿","SiteEngNam":"Shalu","AreaName":"中部空品區","County":"臺中市","Township":"沙鹿區","SiteAddres":"臺中市沙鹿區英才路150號","TWD97Lon":"120.56879400000","TWD97Lat":"24.22562800000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.746394,24.74791700071788]},"properties":{"SiteName":"宜蘭","SiteEngNam":"Yilan","AreaName":"宜蘭空品區","County":"宜蘭縣","Township":"宜蘭市","SiteAddres":"宜蘭縣宜蘭市復興路二段77號","TWD97Lon":"121.74639400000","TWD97Lat":"24.74791700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.641092,24.151958000704997]},"properties":{"SiteName":"忠明","SiteEngNam":"Zhongming","AreaName":"中部空品區","County":"臺中市","Township":"南屯區","SiteAddres":"臺中市南屯區公益路二段296號","TWD97Lon":"120.64109200000","TWD97Lat":"24.15195800000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.578611,25.0500000007243]},"properties":{"SiteName":"松山","SiteEngNam":"Songshan","AreaName":"北部空品區","County":"臺北市","Township":"松山區","SiteAddres":"臺北市松山區八德路四段746號","TWD97Lon":"121.57861100000","TWD97Lat":"25.05000000000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.458667,25.01297200072351]},"properties":{"SiteName":"板橋","SiteEngNam":"Banqiao","AreaName":"北部空品區","County":"新北市","Township":"板橋區","SiteAddres":"新北市板橋區文化路一段25號","TWD97Lon":"121.45866700000","TWD97Lat":"25.01297200000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.376869,25.077197000724865]},"properties":{"SiteName":"林口","SiteEngNam":"Linkou","AreaName":"北部空品區","County":"新北市","Township":"林口區","SiteAddres":"新北市林口區民治路25號","TWD97Lon":"121.37686900000","TWD97Lat":"25.07719700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.41175,22.479500000667237]},"properties":{"SiteName":"林園","SiteEngNam":"Linyuan","AreaName":"高屏空品區","County":"高雄市","Township":"林園區","SiteAddres":"高雄市林園區北汕路58巷2號","TWD97Lon":"120.41175000000","TWD97Lat":"22.47950000000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.599769,23.971306000701038]},"properties":{"SiteName":"花蓮","SiteEngNam":"Hualien","AreaName":"花東空品區","County":"花蓮縣","Township":"花蓮市","SiteAddres":"花蓮市中正路210號","TWD97Lon":"121.59976900000","TWD97Lat":"23.97130600000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[118.31225599998685,24.43213300070606]},"properties":{"SiteName":"金門","SiteEngNam":"Kinmen","AreaName":"其他","County":"金門縣","Township":"金城鎮","SiteAddres":"金門縣金城鎮民權路32號","TWD97Lon":"118.31225600000","TWD97Lat":"24.43213300000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.288086,22.632567000670793]},"properties":{"SiteName":"前金","SiteEngNam":"Qianjin","AreaName":"高屏空品區","County":"高雄市","Township":"前金區","SiteAddres":"高雄市前金區河南二路196號","TWD97Lon":"120.28808600000","TWD97Lat":"22.63256700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.307564,22.605386000670162]},"properties":{"SiteName":"前鎮","SiteEngNam":"Qianzhen","AreaName":"高屏空品區","County":"高雄市","Township":"前鎮區","SiteAddres":"高雄市前鎮區中山三路43號","TWD97Lon":"120.30756400000","TWD97Lat":"22.60538600000","SiteType":"工業測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.685306,23.913000000699753]},"properties":{"SiteName":"南投","SiteEngNam":"Nantou","AreaName":"中部空品區","County":"南投縣","Township":"南投市","SiteAddres":"南投市南陽路269號","TWD97Lon":"120.68530600000","TWD97Lat":"23.91300000000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.488033,22.673081000671722]},"properties":{"SiteName":"屏東","SiteEngNam":"Pingtung","AreaName":"高屏空品區","County":"屏東縣","Township":"屏東市","SiteAddres":"屏東市蘇州街75號","TWD97Lon":"120.48803300000","TWD97Lat":"22.67308100000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.788928,21.95806900065498]},"properties":{"SiteName":"恆春","SiteEngNam":"Hengchun","AreaName":"高屏空品區","County":"屏東縣","Township":"恆春鎮","SiteAddres":"屏東縣恆春鎮公園路44號","TWD97Lon":"120.78892800000","TWD97Lat":"21.95806900000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.530542,22.88358300067658]},"properties":{"SiteName":"美濃","SiteEngNam":"Meinong","AreaName":"高屏空品區","County":"高雄市","Township":"美濃區","SiteAddres":"高雄市美濃區中壇里忠孝路19號","TWD97Lon":"120.53054200000","TWD97Lat":"22.88358300000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.8202,24.56526900071396]},"properties":{"SiteName":"苗栗","SiteEngNam":"Miaoli","AreaName":"竹苗空品區","County":"苗栗縣","Township":"苗栗市","SiteAddres":"苗栗市縣府路100號","TWD97Lon":"120.82020000000","TWD97Lat":"24.56526900000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.967903,23.96884200070098]},"properties":{"SiteName":"埔里","SiteEngNam":"Puli","AreaName":"中部空品區","County":"南投縣","Township":"埔里鎮","SiteAddres":"南投縣埔里鎮西安路一段193號","TWD97Lon":"120.96790300000","TWD97Lat":"23.96884200000","SiteType":"其它測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.319964,24.994789000723134]},"properties":{"SiteName":"桃園","SiteEngNam":"Taoyuan","AreaName":"北部空品區","County":"桃園市","Township":"桃園區","SiteAddres":"桃園市桃園區成功路二段144號","TWD97Lon":"121.31996400000","TWD97Lat":"24.99478900000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[119.56615799999966,23.569031000692004]},"properties":{"SiteName":"馬公","SiteEngNam":"Magong","AreaName":"其他","County":"澎湖縣","Township":"馬公市","SiteAddres":"澎湖縣馬公市中正路115號","TWD97Lon":"119.56615800000","TWD97Lat":"23.56903100000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[119.949875,26.160469000747128]},"properties":{"SiteName":"馬祖","SiteEngNam":"Matsu","AreaName":"其他","County":"連江縣","Township":"南竿鄉","SiteAddres":"連江縣南竿鄉介壽村13號","TWD97Lon":"119.94987500000","TWD97Lat":"26.16046900000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.760056,25.129167000725957]},"properties":{"SiteName":"基隆","SiteEngNam":"Keelung","AreaName":"北部空品區","County":"基隆市","Township":"信義區","SiteAddres":"基隆市東信路324號","TWD97Lon":"121.76005600000","TWD97Lat":"25.12916700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.348742,23.75754700069631]},"properties":{"SiteName":"崙背","SiteEngNam":"Lunbei","AreaName":"雲嘉南空品區","County":"雲林縣","Township":"崙背鄉","SiteAddres":"雲林縣崙背鄉南陽村大成路91號","TWD97Lon":"120.34874200000","TWD97Lat":"23.75754700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.449239,25.164500000726708]},"properties":{"SiteName":"淡水","SiteEngNam":"Tamsui","AreaName":"北部空品區","County":"新北市","Township":"淡水區","SiteAddres":"新北市淡水區中正東路42巷6號","TWD97Lon":"121.44923900000","TWD97Lat":"25.16450000000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.251825,23.753506000696216]},"properties":{"SiteName":"麥寮","SiteEngNam":"Mailiao","AreaName":"雲嘉南空品區","County":"雲林縣","Township":"麥寮鄉","SiteAddres":"雲林縣麥寮鄉中興路115號","TWD97Lon":"120.25182500000","TWD97Lat":"23.75350600000","SiteType":"工業測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.297142,23.115097000681867]},"properties":{"SiteName":"善化","SiteEngNam":"Shanhua","AreaName":"雲嘉南空品區","County":"臺南市","Township":"善化區","SiteAddres":"臺南市善化區益名寮60號","TWD97Lon":"120.29714200000","TWD97Lat":"23.11509700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.312017,22.608711000670233]},"properties":{"SiteName":"復興","SiteEngNam":"Fuxing","AreaName":"高屏空品區","County":"高雄市","Township":"前鎮區","SiteAddres":"高雄市前鎮區民權二路331號","TWD97Lon":"120.31201700000","TWD97Lat":"22.60871100000","SiteType":"交通測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.038653,24.900142000721125]},"properties":{"SiteName":"湖口","SiteEngNam":"Hukou","AreaName":"竹苗空品區","County":"新竹縣","Township":"湖口鄉","SiteAddres":"新竹縣湖口鄉成功路360號","TWD97Lon":"121.03865300000","TWD97Lat":"24.90014200000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.481028,25.068950000724694]},"properties":{"SiteName":"菜寮","SiteEngNam":"Cailiao","AreaName":"北部空品區","County":"新北市","Township":"三重區","SiteAddres":"新北市三重區中正北路163號","TWD97Lon":"121.48102800000","TWD97Lat":"25.06895000000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.529583,25.182722000727075]},"properties":{"SiteName":"陽明","SiteEngNam":"Yangming","AreaName":"北部空品區","County":"臺北市","Township":"北投區","SiteAddres":"臺北市北投區竹子湖路111號","TWD97Lon":"121.52958300000","TWD97Lat":"25.18272200000","SiteType":"公園測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.972075,24.80561900071912]},"properties":{"SiteName":"新竹","SiteEngNam":"Hsinchu","AreaName":"竹苗空品區","County":"新竹市","Township":"東區","SiteAddres":"新竹市民族路33號","TWD97Lon":"120.97207500000","TWD97Lat":"24.80561900000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.537778,24.977222000722765]},"properties":{"SiteName":"新店","SiteEngNam":"Xindian","AreaName":"北部空品區","County":"新北市","Township":"新店區","SiteAddres":"新北市新店區民族路108號","TWD97Lon":"121.53777800000","TWD97Lat":"24.97722200000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.4325,25.03797200072404]},"properties":{"SiteName":"新莊","SiteEngNam":"Xinzhuang","AreaName":"北部空品區","County":"新北市","Township":"新莊區","SiteAddres":"新北市新莊區中正路510號","TWD97Lon":"121.43250000000","TWD97Lat":"25.03797200000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.345531,23.554839000691793]},"properties":{"SiteName":"新港","SiteEngNam":"Xingang","AreaName":"雲嘉南空品區","County":"嘉義縣","Township":"新港鄉","SiteAddres":"嘉義縣新港鄉登雲路105號","TWD97Lon":"120.34553100000","TWD97Lat":"23.55483900000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.31725,23.305633000686182]},"properties":{"SiteName":"新營","SiteEngNam":"Xinying","AreaName":"雲嘉南空品區","County":"臺南市","Township":"新營區","SiteAddres":"臺南市新營區中正路4號","TWD97Lon":"120.31725000000","TWD97Lat":"23.30563300000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.328289,22.73366700067312]},"properties":{"SiteName":"楠梓","SiteEngNam":"Nanzi","AreaName":"高屏空品區","County":"高雄市","Township":"楠梓區","SiteAddres":"高雄市楠梓區楠梓路262號","TWD97Lon":"120.32828900000","TWD97Lat":"22.73366700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.689881,25.179667000727022]},"properties":{"SiteName":"萬里","SiteEngNam":"Wanli","AreaName":"北部空品區","County":"新北市","Township":"萬里區","SiteAddres":"新北市萬里區瑪鋉路221號","TWD97Lon":"121.68988100000","TWD97Lat":"25.17966700000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.507972,25.046503000724222]},"properties":{"SiteName":"萬華","SiteEngNam":"Wanhua","AreaName":"北部空品區","County":"臺北市","Township":"萬華區","SiteAddres":"臺北市萬華區中華路1段66號","TWD97Lon":"121.50797200000","TWD97Lat":"25.04650300000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.440833,23.46277800068972]},"properties":{"SiteName":"嘉義","SiteEngNam":"Chiayi","AreaName":"雲嘉南空品區","County":"嘉義市","Township":"西區","SiteAddres":"嘉義市西區新民路580號","TWD97Lon":"120.44083300000","TWD97Lat":"23.46277800000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.541519,24.066000000703117]},"properties":{"SiteName":"彰化","SiteEngNam":"Changhua","AreaName":"中部空品區","County":"彰化縣","Township":"彰化市","SiteAddres":"彰化縣彰化市文心街55號","TWD97Lon":"120.54151900000","TWD97Lat":"24.06600000000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.202842,23.717533000695422]},"properties":{"SiteName":"臺西","SiteEngNam":"Taixi","AreaName":"雲嘉南空品區","County":"雲林縣","Township":"臺西鄉","SiteAddres":"雲林縣臺西鄉五港路505號","TWD97Lon":"120.20284200000","TWD97Lat":"23.71753300000","SiteType":"工業測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.15045,22.755358000673624]},"properties":{"SiteName":"臺東","SiteEngNam":"Taitung","AreaName":"花東空品區","County":"臺東縣","Township":"臺東市","SiteAddres":"臺東市中山路276號","TWD97Lon":"121.15045000000","TWD97Lat":"22.75535800000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.202617,22.98458100067888]},"properties":{"SiteName":"臺南","SiteEngNam":"Tainan","AreaName":"雲嘉南空品區","County":"臺南市","Township":"中西區","SiteAddres":"臺南市中西區南寧街45號","TWD97Lon":"120.20261700000","TWD97Lat":"22.98458100000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.358083,22.627392000670667]},"properties":{"SiteName":"鳳山","SiteEngNam":"Fengshan","AreaName":"高屏空品區","County":"高雄市","Township":"鳳山區","SiteAddres":"高雄市鳳山區曹公路6號","TWD97Lon":"120.35808300000","TWD97Lat":"22.62739200000","SiteType":"交通測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.561175,22.52310800066824]},"properties":{"SiteName":"潮州","SiteEngNam":"Chaozhou","AreaName":"高屏空品區","County":"屏東縣","Township":"潮州鎮","SiteAddres":"屏東縣潮州鎮九塊里復興路66號","TWD97Lon":"120.56117500000","TWD97Lat":"22.52310800000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.469061,24.131672000704558]},"properties":{"SiteName":"線西","SiteEngNam":"Xianxi","AreaName":"中部空品區","County":"彰化縣","Township":"線西鄉","SiteAddres":"彰化縣線西鄉寓埔村中央路二段145號","TWD97Lon":"120.46906100000","TWD97Lat":"24.13167200000","SiteType":"工業測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.305689,22.757506000673683]},"properties":{"SiteName":"橋頭","SiteEngNam":"Qiaotou","AreaName":"高屏空品區","County":"高雄市","Township":"橋頭區","SiteAddres":"高雄市橋頭區隆豐北路1號","TWD97Lon":"120.30568900000","TWD97Lat":"22.75750600000","SiteType":"背景測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.898572,24.696969000716795]},"properties":{"SiteName":"頭份","SiteEngNam":"Toufen","AreaName":"竹苗空品區","County":"苗栗縣","Township":"頭份鎮","SiteAddres":"苗栗縣頭份鎮文化街20號","TWD97Lon":"120.89857200000","TWD97Lat":"24.69696900000","SiteType":"工業測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.21635,24.863869000720356]},"properties":{"SiteName":"龍潭","SiteEngNam":"Longtan","AreaName":"北部空品區","County":"桃園市","Township":"龍潭區","SiteAddres":"桃園市龍潭區中正路210號","TWD97Lon":"121.21635000000","TWD97Lat":"24.86386900000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[120.741711,24.256586000707298]},"properties":{"SiteName":"豐原","SiteEngNam":"Fengyuan","AreaName":"中部空品區","County":"臺中市","Township":"豐原區","SiteAddres":"臺中市豐原區水源路150號","TWD97Lon":"120.74171100000","TWD97Lat":"24.25658600000","SiteType":"一般測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.161933,23.045083000680275]},"properties":{"SiteName":"關山","SiteEngNam":"Guanshan","AreaName":"花東空品區","County":"臺東縣","Township":"關山鎮","SiteAddres":"臺東縣關山鎮自強路66號","TWD97Lon":"121.16193300000","TWD97Lat":"23.04508300000","SiteType":"其它測站"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[121.082761,25.03550300072398]},"properties":{"SiteName":"觀音","SiteEngNam":"Guanyin","AreaName":"北部空品區","County":"桃園市","Township":"觀音區","SiteAddres":"桃園市觀音區文化路2號","TWD97Lon":"121.08276100000","TWD97Lat":"25.03550300000","SiteType":"背景測站"}}]};

// WBGT
var wbgt = require('../public/testData/wbgt_1hr.json');
// RethinkDB Connection
var r = require('rethinkdb');
var rethinkdbHost = "plash3.iis.sinica.edu.tw";
var connection = null;
r.connect( {host: rethinkdbHost, port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})

// Example API
router.get('/images', function(req, res) {
    res.json({ message: "LAB第一個API!" });
});

// Get Current Air Quilty Index
router.get('/currentAQI', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  r.table('air').filter({PublishTime: r.table('air').max('epochtime')('PublishTime')})
    .run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      //console.log(JSON.stringify(result, null, 2));
      res.json(result);
    });
  });
});

// Get Air Observe Stations Info
router.get('/stations', function(req, res) {
  res.json(airstation);
});

// Geojson with currentAQI
// Get Current Air Quilty Index
router.get('/geojsonAQI', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log(wbgt);
  r.table('air').filter({epochtime: r.table('air').max('epochtime')('epochtime')})
      .run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      for(var i = 0, ilen = airstation.features.length; i < ilen; i++){
        for(var j = 0, jlen = result.length; j < jlen; j++){
          if(airstation.features[i].properties.SiteName == result[j].SiteName){
            airstation.features[i].properties['PSI'] = result[j].PSI;
            airstation.features[i].properties['MajorPollutant'] = result[j].MajorPollutant;
            airstation.features[i].properties['Status'] = result[j].Status;
            airstation.features[i].properties['SO2'] = result[j].SO2;
            airstation.features[i].properties['CO'] = result[j].CO;
            airstation.features[i].properties['NO2'] = result[j].NO2;
            airstation.features[i].properties['O3'] = result[j].O3;
            airstation.features[i].properties['PM10'] = result[j].PM10;
            airstation.features[i].properties['PM2.5'] = result[j]['PM2.5'];
            airstation.features[i].properties['FPMI'] = result[j].FPMI;
            airstation.features[i].properties['PublishTime'] = result[j].PublishTime;
          }
        }
        for(var k = 0, klen = wbgt.length; k < klen; k++){
          if(airstation.features[i].properties.SiteName == wbgt[k].SiteName){
            airstation.features[i].properties['WBGT'] = wbgt[k].wbgto_max;
          }
        }
      }
      res.json(airstation);
    });
  });
});

// Geojson with currentAQI & LASS
// Get Current Air Quilty Index
router.get('/geojsonLASS', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  r.table('air').filter({epochtime: r.table('air').max('epochtime')('epochtime')})
      .run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      for(var i = 0, ilen = airstation.features.length; i < ilen; i++){
        for(var j = 0, jlen = result.length; j < jlen; j++){
          if(airstation.features[i].properties.SiteName == result[j].SiteName){
            airstation.features[i].properties['PSI'] = result[j].PSI;
            airstation.features[i].properties['MajorPollutant'] = result[j].MajorPollutant;
            airstation.features[i].properties['Status'] = result[j].Status;
            airstation.features[i].properties['SO2'] = result[j].SO2;
            airstation.features[i].properties['CO'] = result[j].CO;
            airstation.features[i].properties['NO2'] = result[j].NO2;
            airstation.features[i].properties['O3'] = result[j].O3;
            airstation.features[i].properties['PM10'] = result[j].PM10;
            airstation.features[i].properties['PM2.5'] = result[j]['PM2.5'];
            airstation.features[i].properties['FPMI'] = result[j].FPMI;
            airstation.features[i].properties['PublishTime'] = result[j].PublishTime;
          }
        }
      }
      //res.json(airstation);
    });
  });
  //{"type":"Feature","geometry":{"type":"Point","coordinates":[120.409653,23.925175000700026]},"properties":{"SiteName":"
  var d = new Date();
  var now = d.getTime()/1000 - 8*60*60;
  var past = now - 1*10
  console.log(now);
  r.db("Heat_Wave").table("LASS_rawdata")
    .hasFields(["timestamp","created_time"])
    .filter(r.row("timestamp").lt(now).and(r.row("timestamp").gt(past)))
    .without("created_time")
    .run(connection, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
        if (err) throw err;
        var lassnode = array();
        lassnode = JSON.parse(JSON.stringify(airstation));
        for(var i = 0, ilen = result.length; i < ilen; i++){
          var node = {};
          var gps_lat = result[i].gps_lat;
          var gps_lon = result[i].gps_lon;
				  tmp = gps_lat - Math.floor(gps_lat);
				  tmp = tmp / 60 * 100 * 100;
				  tmp2 = tmp - Math.floor(tmp);
				  tmp2 = tmp2 * 100;
				  gps_lat = Math.floor(gps_lat) + Math.floor(tmp) * 0.01 + tmp2 * 0.0001;

				  tmp = gps_lon - Math.floor(gps_lon);
				  tmp = tmp / 60 * 100 * 100;
				  tmp2 = tmp - Math.floor(tmp);
				  tmp2 = tmp2 * 100;
				  gps_lon = Math.floor(gps_lon) + Math.floor(tmp) * 0.01 + tmp2 * 0.0001;
          node['type'] = "Feature";
          node['geometry'] = {"type":"Point","coordinates":[gps_lon,gps_lat]};
          node['properties'] = {"SiteName":result[i].device_id,"PM2.5":result[i].s_d0,"TWD97Lon":gps_lon,"TWD97Lat":gps_lat,"SiteType":"LASS"};
          console.log(JSON.stringify(node));
          lassnode.features.push(node);
      }
      res.json(lassnode);
    });
  });
});


// Geojson with seriesAQI
// Get Current Air Quilty Index
router.get('/seriesAQI/:siteName', function(req, res) {
  var siteName = req.params.siteName;

  console.log("Query SiteName : " + req.params.siteName);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  //r.table('air').filter({epochtime: r.table('air').max('epochtime')('epochtime'), })
  //r.table("air").filter({SiteName : siteName}).orderBy(r.desc("epochtime"))
  //r.table("air").filter({SiteName : siteName}).orderBy(r.desc("epochtime")).pluck(pollutant).map(r.row(pollutant)).limit(24)
  r.table("air").filter({SiteName : siteName}).orderBy(r.desc("epochtime")).limit(24)
      .run(connection, function(err, cursor) {
    if (err) throw err;
    var valueList = {
      PSI: [],
      SO2: [],
      CO: [],
      NO2: [],
      O3: [],
      PM10: [],
      PM25: [],
      FPMI: [],
      PublishTime: []
    };
    cursor.each(function(err, row) {
      if (err) throw err;
      var d = new Date(row.PublishTime);
      valueList.PSI.push(row.PSI);
      valueList.SO2.push(row.SO2);
      valueList.CO.push(row.CO);
      valueList.NO2.push(row.NO2);
      valueList.O3.push(row.O3);
      valueList.PM10.push(row.PM10);
      valueList.PM25.push(row['PM2.5']);
      valueList.FPMI.push(row.FPMI);
      valueList.PublishTime.push(d.getHours() + ":00");
      if(valueList.PSI.length == 24){
        console.log(JSON.stringify(valueList));
        res.json(valueList);
      }
    });
  });
});

// Geojson with seriesAQI
// Get Current Air Quilty Index
router.get('/weeklyStat/:siteName', function(req, res) {
  var siteName = req.params.siteName;

  console.log("Query SiteName : " + req.params.siteName);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  //r.table('air').filter({epochtime: r.table('air').max('epochtime')('epochtime'), })
  //r.table("air").filter({SiteName : siteName}).orderBy(r.desc("epochtime"))
  //r.table("air").filter({SiteName : siteName}).orderBy(r.desc("epochtime")).pluck(pollutant).map(r.row(pollutant)).limit(24)
  r.table("air").filter({SiteName : siteName})
      .run(connection, function(err, cursor) {
    if (err) throw err;
    var average = {
      Monday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Tuesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Wednesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Thuesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Friday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Saturday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Sunday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
    };


    var counts = {
      Monday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Tuesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Wednesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Thuesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Friday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Saturday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Sunday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 }
    };
    cursor.each(function(err, row) {
      if (err) throw err;

      if (row.hasOwnProperty('PublishTime')){
        var someDay = new Date(row.PublishTime);
        var weekday = someDay.getDay();
        if (row.hasOwnProperty('PSI')){
          if (row.PSI != '') {
            switch(weekday){
              case 1:
                average.Monday.PSI += parseFloat(row.PSI);
                counts.Monday.PSI++;
                break;
              case 2:
                average.Tuesday.PSI += parseFloat(row.PSI);
                counts.Tuesday.PSI++;
                break;
              case 3:
                average.Wednesday.PSI += parseFloat(row.PSI);
                counts.Wednesday.PSI++;
                break;
              case 4:
                average.Thuesday.PSI += parseFloat(row.PSI);
                counts.Thuesday.PSI++;
                break;
              case 5:
                average.Friday.PSI += parseFloat(row.PSI);
                counts.Friday.PSI++;
                break;
              case 6:
                average.Saturday.PSI += parseFloat(row.PSI);
                counts.Saturday.PSI++;
                break;
              case 0:
                average.Sunday.PSI += parseFloat(row.PSI);
                counts.Sunday.PSI++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('SO2')){
          if (row.SO2 != '') {
            switch(weekday){
              case 1:
                average.Monday.SO2 += parseFloat(row.SO2);
                counts.Monday.SO2++;
                break;
              case 2:
                average.Tuesday.SO2 += parseFloat(row.SO2);
                counts.Tuesday.SO2++;
                break;
              case 3:
                average.Wednesday.SO2 += parseFloat(row.SO2);
                counts.Wednesday.SO2++;
                break;
              case 4:
                average.Thuesday.SO2 += parseFloat(row.SO2);
                counts.Thuesday.SO2++;
                break;
              case 5:
                average.Friday.SO2 += parseFloat(row.SO2);
                counts.Friday.SO2++;
                break;
              case 6:
                average.Saturday.SO2 += parseFloat(row.SO2);
                counts.Saturday.SO2++;
                break;
              case 0:
                average.Sunday.SO2 += parseFloat(row.SO2);
                counts.Sunday.SO2++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('CO')){
          if (row.CO != '') {
            switch(weekday){
              case 1:
                average.Monday.CO += parseFloat(row.CO);
                counts.Monday.CO++;
                break;
              case 2:
                average.Tuesday.CO += parseFloat(row.CO);
                counts.Tuesday.CO++;
                break;
              case 3:
                average.Wednesday.CO += parseFloat(row.CO);
                counts.Wednesday.CO++;
                break;
              case 4:
                average.Thuesday.CO += parseFloat(row.CO);
                counts.Thuesday.CO++;
                break;
              case 5:
                average.Friday.CO += parseFloat(row.CO);
                counts.Friday.CO++;
                break;
              case 6:
                average.Saturday.CO += parseFloat(row.CO);
                counts.Saturday.CO++;
                break;
              case 0:
                average.Sunday.CO += parseFloat(row.CO);
                counts.Sunday.CO++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('NO2')){
          if (row.NO2 != '') {
            switch(weekday){
              case 1:
                average.Monday.NO2 += parseFloat(row.NO2);
                counts.Monday.NO2++;
                break;
              case 2:
                average.Tuesday.NO2 += parseFloat(row.NO2);
                counts.Tuesday.NO2++;
                break;
              case 3:
                average.Wednesday.NO2 += parseFloat(row.NO2);
                counts.Wednesday.NO2++;
                break;
              case 4:
                average.Thuesday.NO2 += parseFloat(row.NO2);
                counts.Thuesday.NO2++;
                break;
              case 5:
                average.Friday.NO2 += parseFloat(row.NO2);
                counts.Friday.NO2++;
                break;
              case 6:
                average.Saturday.NO2 += parseFloat(row.NO2);
                counts.Saturday.NO2++;
                break;
              case 0:
                average.Sunday.NO2 += parseFloat(row.NO2);
                counts.Sunday.NO2++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('O3')){
          if (row.O3 != '') {
            switch(weekday){
              case 1:
                average.Monday.O3 += parseFloat(row.O3);
                counts.Monday.O3++;
                break;
              case 2:
                average.Tuesday.O3 += parseFloat(row.O3);
                counts.Tuesday.O3++;
                break;
              case 3:
                average.Wednesday.O3 += parseFloat(row.O3);
                counts.Wednesday.O3++;
                break;
              case 4:
                average.Thuesday.O3 += parseFloat(row.O3);
                counts.Thuesday.O3++;
                break;
              case 5:
                average.Friday.O3 += parseFloat(row.O3);
                counts.Friday.O3++;
                break;
              case 6:
                average.Saturday.O3 += parseFloat(row.O3);
                counts.Saturday.O3++;
                break;
              case 0:
                average.Sunday.O3 += parseFloat(row.O3);
                counts.Sunday.O3++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('PM10')){
          if (row.PM10 != '') {
            switch(weekday){
              case 1:
                average.Monday.PM10 += parseFloat(row.PM10);
                counts.Monday.PM10++;
                break;
              case 2:
                average.Tuesday.PM10 += parseFloat(row.PM10);
                counts.Tuesday.PM10++;
                break;
              case 3:
                average.Wednesday.PM10 += parseFloat(row.PM10);
                counts.Wednesday.PM10++;
                break;
              case 4:
                average.Thuesday.PM10 += parseFloat(row.PM10);
                counts.Thuesday.PM10++;
                break;
              case 5:
                average.Friday.PM10 += parseFloat(row.PM10);
                counts.Friday.PM10++;
                break;
              case 6:
                average.Saturday.PM10 += parseFloat(row.PM10);
                counts.Saturday.PM10++;
                break;
              case 0:
                average.Sunday.PM10 += parseFloat(row.PM10);
                counts.Sunday.PM10++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('PM2.5')){
          if (row['PM2.5'] != '') {
            switch(weekday){
              case 1:
                average.Monday.PM25 += parseFloat(row['PM2.5']);
                counts.Monday.PM25++;
                break;
              case 2:
                average.Tuesday.PM25 += parseFloat(row['PM2.5']);
                counts.Tuesday.PM25++;
                break;
              case 3:
                average.Wednesday.PM25 += parseFloat(row['PM2.5']);
                counts.Wednesday.PM25++;
                break;
              case 4:
                average.Thuesday.PM25 += parseFloat(row['PM2.5']);
                counts.Thuesday.PM25++;
                break;
              case 5:
                average.Friday.PM25 += parseFloat(row['PM2.5']);
                counts.Friday.PM25++;
                break;
              case 6:
                average.Saturday.PM25 += parseFloat(row['PM2.5']);
                counts.Saturday.PM25++;
                break;
              case 0:
                average.Sunday.PM25 += parseFloat(row['PM2.5']);
                counts.Sunday.PM25++;
                break;
            }
          }
        }
      }
    });

    average.Monday.PSI = parseFloat((average.Monday.PSI/counts.Monday.PSI).toFixed(2));
    average.Monday.SO2 = parseFloat((average.Monday.PSI/counts.Monday.SO2).toFixed(2));
    average.Monday.CO = parseFloat((average.Monday.CO/counts.Monday.CO).toFixed(2));
    average.Monday.NO2 = parseFloat((average.Monday.NO2/counts.Monday.NO2).toFixed(2));
    average.Monday.O3 = parseFloat((average.Monday.O3/counts.Monday.O3).toFixed(2));
    average.Monday.PM10 = parseFloat((average.Monday.PM10/counts.Monday.PM10).toFixed(2));
    average.Monday.PM25 = parseFloat((average.Monday.PM25/counts.Monday.PM25).toFixed(2));

    average.Tuesday.PSI = parseFloat((average.Tuesday.PSI/counts.Tuesday.PSI).toFixed(2));
    average.Tuesday.SO2 = parseFloat((average.Tuesday.PSI/counts.Tuesday.SO2).toFixed(2));
    average.Tuesday.CO = parseFloat((average.Tuesday.CO/counts.Tuesday.CO).toFixed(2));
    average.Tuesday.NO2 = parseFloat((average.Tuesday.NO2/counts.Tuesday.NO2).toFixed(2));
    average.Tuesday.O3 = parseFloat((average.Tuesday.O3/counts.Tuesday.O3).toFixed(2));
    average.Tuesday.PM10 = parseFloat((average.Tuesday.PM10/counts.Tuesday.PM10).toFixed(2));
    average.Tuesday.PM25 = parseFloat((average.Tuesday.PM25/counts.Tuesday.PM25).toFixed(2));

    average.Wednesday.PSI = parseFloat((average.Wednesday.PSI/counts.Wednesday.PSI).toFixed(2));
    average.Wednesday.SO2 = parseFloat((average.Wednesday.PSI/counts.Wednesday.SO2).toFixed(2));
    average.Wednesday.CO = parseFloat((average.Wednesday.CO/counts.Wednesday.CO).toFixed(2));
    average.Wednesday.NO2 = parseFloat((average.Wednesday.NO2/counts.Wednesday.NO2).toFixed(2));
    average.Wednesday.O3 = parseFloat((average.Wednesday.O3/counts.Wednesday.O3).toFixed(2));
    average.Wednesday.PM10 = parseFloat((average.Wednesday.PM10/counts.Wednesday.PM10).toFixed(2));
    average.Wednesday.PM25 = parseFloat((average.Wednesday.PM25/counts.Wednesday.PM25).toFixed(2));

    average.Thuesday.PSI = parseFloat((average.Thuesday.PSI/counts.Thuesday.PSI).toFixed(2));
    average.Thuesday.SO2 = parseFloat((average.Thuesday.PSI/counts.Thuesday.SO2).toFixed(2));
    average.Thuesday.CO = parseFloat((average.Thuesday.CO/counts.Thuesday.CO).toFixed(2));
    average.Thuesday.NO2 = parseFloat((average.Thuesday.NO2/counts.Thuesday.NO2).toFixed(2));
    average.Thuesday.O3 = parseFloat((average.Thuesday.O3/counts.Thuesday.O3).toFixed(2));
    average.Thuesday.PM10 = parseFloat((average.Thuesday.PM10/counts.Thuesday.PM10).toFixed(2));
    average.Thuesday.PM25 = parseFloat((average.Thuesday.PM25/counts.Thuesday.PM25).toFixed(2));

    average.Friday.PSI = parseFloat((average.Friday.PSI/counts.Friday.PSI).toFixed(2));
    average.Friday.SO2 = parseFloat((average.Friday.PSI/counts.Friday.SO2).toFixed(2));
    average.Friday.CO = parseFloat((average.Friday.CO/counts.Friday.CO).toFixed(2));
    average.Friday.NO2 = parseFloat((average.Friday.NO2/counts.Friday.NO2).toFixed(2));
    average.Friday.O3 = parseFloat((average.Friday.O3/counts.Friday.O3).toFixed(2));
    average.Friday.PM10 = parseFloat((average.Friday.PM10/counts.Friday.PM10).toFixed(2));
    average.Friday.PM25 = parseFloat((average.Friday.PM25/counts.Friday.PM25).toFixed(2));

    average.Saturday.PSI = parseFloat((average.Saturday.PSI/counts.Saturday.PSI).toFixed(2));
    average.Saturday.SO2 = parseFloat((average.Saturday.PSI/counts.Saturday.SO2).toFixed(2));
    average.Saturday.CO = parseFloat((average.Saturday.CO/counts.Saturday.CO).toFixed(2));
    average.Saturday.NO2 = parseFloat((average.Saturday.NO2/counts.Saturday.NO2).toFixed(2));
    average.Saturday.O3 = parseFloat((average.Saturday.O3/counts.Saturday.O3).toFixed(2));
    average.Saturday.PM10 = parseFloat((average.Saturday.PM10/counts.Saturday.PM10).toFixed(2));
    average.Saturday.PM25 = parseFloat((average.Saturday.PM25/counts.Saturday.PM25).toFixed(2));

    average.Sunday.PSI = parseFloat((average.Sunday.PSI/counts.Sunday.PSI).toFixed(2));
    average.Sunday.SO2 = parseFloat((average.Sunday.PSI/counts.Sunday.SO2).toFixed(2));
    average.Sunday.CO = parseFloat((average.Sunday.CO/counts.Sunday.CO).toFixed(2));
    average.Sunday.NO2 = parseFloat((average.Sunday.NO2/counts.Sunday.NO2).toFixed(2));
    average.Sunday.O3 = parseFloat((average.Sunday.O3/counts.Sunday.O3).toFixed(2));
    average.Sunday.PM10 = parseFloat((average.Sunday.PM10/counts.Sunday.PM10).toFixed(2));
    average.Sunday.PM25 = parseFloat((average.Sunday.PM25/counts.Sunday.PM25).toFixed(2));

    console.log(JSON.stringify(average));
    res.json(average);
  });
});

// For Pica Test
router.post('/uploadCSV', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  var csvFile;

  console.log(JSON.stringify(req.files));

  if (!req.files) {
    res.json('{message:"No files were uploaded."}');
    return;
  }
  var timestamp = Math.floor(Date.now());
  var newPath = '/tmp/' + timestamp + '.csv';
  console.log(newPath);
  csvFile = req.files.uploadCSV;
  csvFile.mv(newPath, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json('{message:"ok"}');
    }
  });
  //res.json('{message:"error"}');
});

module.exports = router;
