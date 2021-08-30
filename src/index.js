import $ from "jquery";

// 引入css
import "@/css/index.css";
// 引入less
import "@/css/index.less";

// 引入图片
import icon from "@/images/icon.png";
$(".box").attr("src", icon);

// JS高级语法
function info(target) {
  target.info = "Person info";
}
@info
class Person {}
console.log(Person.info);
