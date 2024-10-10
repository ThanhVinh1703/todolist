// Mô phỏng lại mô hình client - server của 1 ứng dụng thực tế

// Tạo ra 1 biến dưới dạng dưới dạng 1 danh sách các đối tượng
// cần phải được lưu trữ trong cơ sở dữ liệu (lưu trên server)

// --> Danh sahcs này sẽ mô phỏng lại CSDL đang được lưu trên server

// Todo list --> Đối tuognjw dữ liệu cần phải lưu trữ
// Các todo con "Hit the gyms", "Buy eggs",...
let todoListDataBase = JSON.parse(localStorage.getItem("todoList"));
// let todoListDatabase = [
//     {
//         id: 1,
//         content: "Hit the gyms",
//         status: true,
//     },
//     {
//         id: 2,
//         content: "Buy eggs",
//         status: false,
//     },
//     {
//         id: 3,
//         content: "Read a book",
//         status: false,
//     },
//     {
//         id: 4,
//         content: "Pay bills",
//         status: false,
//     }


// ];

// Tính năng: Read- Render
// Hiển thị toàn bộ dữ liệu có trong CSDL thành các phần tử HTML

// Gọi các thành phần HTML cần phải sử dụng
let input = document.getElementById("myInput");
let addBtn = document.getElementById("addBtn");
let ul = document.getElementById("myUL")
let lilSist = document.getElementsByTagName("li");
// Nên có 1 bước double check
// - Khi lấy được 1 phần tử HTML nào đó sang Javascript
// --> Log ra manf hình console để kiểm tra xem có đúng đã lấy được phần
// tử đó hay chưa?

// console.log("ul", ul);

// Phân tích ???
// tử mảng dữ liều 4 phần tử [{}, {}, {}, {}]
// --> Danh sách thẻ <li>{}</li>, <li>{}</li>, <li>{}</li>, <li>{}</li>,
// --> Lần lượt cho 4 thẻ <li>{}</li> và làm con của thẻ ul

// Solution: Duyệt qua danh sách 4 phần tửm tại mỗi phần tử thì tạo ra
// 1 thẻ li với nội dung của phần tử đó bên trong

function render() {
    ul.innerHTML = "";
    for (let todo of todoListDatabase) {
        // console.log(todo);// {}
        // Cách 1:
        // template literal (Template string)
        // Cú pháp giúp chúng ta có thể đưa giá trị của biển vào trong chuỗi
        // thông qua ${}
        let li = "";
        if (todo.status) {
            li = `<li class= "checked" id="${todo.id}"> 
                ${todo.content} 
                <span class = "close" >x</span>
                 </li>`;
        } else {
            li = `<li id="${todo.id}">
                      ${todo.content}
                      <span class= "close">x</span>
                 </li>`;
        }
        
        // let li = `<li>${todo.content}</li>`;
        // let li2 = "<li>" + todo.content + "</li>";//

        // console.log(li);
        ul.innerHTML = ul.innerHTML + li;
        // ul.innerHTML = ul.innerHTML + `<li>${todo.content}</li>`;

        // Cách 2:

        // let li = document.createElement("li");
        // if(todo.status) {
        //     li.classList.add("checked");
        // }
        // li.innerHTML = todo.content;
        // li.id = todo.id;
        // let span = document.createElement("span")
        // ul.appendChild(li);
    }
// Xử lý sự kiện nhấp vào thẻ <li> để đổi trạng thái hoàn thành
    let lilist = ul.children; //HTML collection - gần giông mảng
    // console.log(lilist);
    // B2: Sử dụng vòng lặp duyệt qua toàn bộ thẻ li
    for (let li of lilist) {
        // B3: gắn sự kiện onclick cho toàn bộ thẻ li
        // console.log(li);
        li.onclick = function () {
            // B4: Kiểm tra xem thẻ li vừa bấm vào tương ứng với đối tượng dữ liệu nào trong CSDL
            // console.log("thẻ li đang ddcuj click", li);
            // console.log(li.id);
            let index = todoListDatabase.findIndex(function (element, index) {
                return element.id === +li.id;
            });
            // console.log(index);  
            // B5: Lấy rra được đối tượn dữ liệu trong CSDL
            // ---> Cập nhật lại trạng thái status của đối tượng dữ liệu đó
            
            todoListDatabase[index].status = !todoListDatabase[index].status;
            localStorage.setItem("todoList", JSON.stringify(todoListDataBase));
            // B6: Gọi lại render() để phản ánh sự thay đổi trong CSDL lên các thẻ li
            render();
        };
    }
    
    // gọi toàn bộ tập hợp thẻ span ra và gắn sự kiện cho nó
    let spanList = document.getElementsByClassName("close");
    for (let span of spanList){
        span.onclick = function(event){
            event.stopPropagation();
            //tìm kiếm đối tượng dữ liệu tương ứng với thẻ span đang nằm trong thẻ li
            //được bấm vào trong CSDL
            let index = todoListDatabase.findIndex(function(element,index){
               return element.id === +span.parentElement.id;
            });
            todoListDatabase.splice(index, 1);
            localStorage.setItem("todoList", JSON.stringify(todoListDataBase));
            render();
        };
    };
}
render();

// *****************
// Gắn sự kiện cho các thẻ li được tạo mới ra mỗi khi hàm render được gọi
// ~~!!~~~~~~~~~~~~~~~~~~!!!!!!~~~~~~~!!!!!~~~~~~'
//B1: gọi lại toàn bộ thẻ li

// Tính năng 2: Create - thêm mới
// ??? thêm mới todo

// Phân tích???
// Khi thêm mới 1 todo -->
// Đồng nghĩa với việc 1 đối tượng dữ liệu todo mới{}
// Với content, status, id sẽ được tạo ra và thêm vào trong
// CSDL

// Đòng thời toàn bộ giao diện sẽ được phản ánh 
// trực tiếp từ sự thay đổi dữ liệu trong CSDL và hiển thị lại
addBtn.addEventListener("click", function () {
    if (input.value) {
        // B1: 
        // Lấy dữ liệu người dừng vừa nhập vào ô input


        // addBtn.onclick = function() {
        //     // Gắn các tác vụ khi sự kiện onclick của nút addBtn được trigger(thực hiện)
        //     alert("hello world");
        // };

        // B2:
        // Từ dữ liệu đó --> {id: unique, content: input, status: false}
        let todoData = {
            id: Math.random(), // 0 --- 0.9999999999 
            content: input.value,
            status: false,
        };

        // B3:
        // Thêm mới đối tượng dữ liệu vào trong CSDL (todoListDatabase)
        todoListDatabase.push(todoData);
        localStorage.setItem("todoList", JSON.stringify(todoListDataBase));
        // B4:
        // Từ mảng dữ liệu mới (Đã được thêm 1 đối tượng dữ liệu)
        // --> Phản ánh sự thay đổi đó ra thành các phần tử HTML
        render();
        input.value = "";
    }

});

// Tính năng 3: Update - Cập nhật
// ??? Cập nhận trạng thái của todo (Hoàn thành/ Chưa hoàn thành)
// ??? Phân tích

// Gắn sự kiện onclick cho toàn bộ thẻ li
// khi bấm vào 1 thẻ li --> xác định được đối tượng dữ liệu
// Tương ứng với thẻ li nằm trong CSDL (todoListDataBase)
// - Từ true -> false
// - từ false -> true
// --> Đối tượng dữ liệu nằm trong CSDL đã được cập nhật -> CSDL có sự tha đổi
// Phản ánh lại sự thay đổi đó lên cấu trúc HTML

// B1: gọi lại toàn bộ thẻ li

// B2: Sử dụng vòng lặp duyệt qua toàn bộ thẻ li

// B3: gắn sự kiện onclick cho toàn bộ thẻ li

// B4: Kiểm tra xem thẻ li vừa bấm vào tương ứng với đối tượng dữ liệu nào trong CSDL

// B5: Lấy rra được đối tượn dữ liệu trong CSDL
// ---> Cập nhật lại trạng thái status của đối tượng dữ liệu đó

// B6: Gọi lại render() để phản ánh sự thay đổi trong CSDL lên các thẻ li
