
document.addEventListener('DOMContentLoaded', () => {

    //Khai báo biến cần thiết
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchBtn');
    const productList = document.getElementById('product-list');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductFormSection = document.getElementById('addProductFormSection'); 
    const newProductForm = document.getElementById('newProductForm');
    const errorMsg = document.getElementById('errorMsg');
    const cancelBtn = document.getElementById('cancelBtn');

    //  Product Search/Filtering Logic 
    
    const filterProducts = () => {
        // Lấy lại danh sách sản phẩm mỗi lần lọc để đảm bảo sản phẩm mới được thêm vào.
        const productItems = document.querySelectorAll('.product-item');
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Nếu ô tìm kiếm trống, hiển thị tất cả sản phẩm
        if (searchTerm === '') {
            productItems.forEach(item => {
                item.style.display = ''; // Hiển thị lại tất cả
            });
            return; 
        }

        productItems.forEach(item => {
            const productNameElement = item.querySelector('.product-name');
            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase().trim();
                
                if (productName.includes(searchTerm)) {
                    item.style.display = ''; // Hiển thị
                } else {
                    item.style.display = 'none'; // Ẩn
                }
            }
        });
    };

    // Gắn sự kiện "click" cho nút tìm kiếm
    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định (nếu có)
        filterProducts(); 
    });


    //Form Toggle/Hủy Logic (Ẩn/Hiện form "Thêm sản phẩm")
    
    const toggleForm = () => {
        addProductFormSection.classList.toggle('hidden');
        newProductForm.reset(); // Reset form khi đóng/mở
        errorMsg.textContent = ''; // Xóa lỗi khi đóng/mở

        // Cập nhật text của nút toggle chính (Optional)
        if (addProductFormSection.classList.contains('hidden')) {
            addProductBtn.textContent = 'Thêm sản phẩm';
        } else {
            addProductBtn.textContent = 'Ẩn Form Thêm Sản Phẩm';
        }
    }

    // Gắn sự kiện cho nút Thêm sản phẩm
    addProductBtn.addEventListener('click', toggleForm);

    // Gắn sự kiện cho nút Hủy trong form
    cancelBtn.addEventListener('click', toggleForm);


    //  Handle New Product Form Submission (Thêm sản phẩm mới) 
    
    newProductForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn chặn form gửi dữ liệu và reload trang.
        
        // Lấy giá trị từ form
        const name = document.getElementById('newName').value.trim();
        const author = document.getElementById('newAuthor').value.trim(); // Lấy trường Tác giả mới
        const priceInput = document.getElementById('newPrice');
        const price = Number(priceInput.value);
        const desc = document.getElementById('newDesc').value.trim();
        
        // Xóa thông báo lỗi cũ
        errorMsg.textContent = ''; 

        // Bắt đầu Validation
        
        if (name === '') {
            errorMsg.textContent = 'Tên sản phẩm không được để trống.';
            return;
        }
        
        if (author === '') {
            errorMsg.textContent = 'Tác giả không được để trống.';
            return;
        }

        if (isNaN(price) || price <= 0) {
            errorMsg.textContent = 'Giá phải là số hợp lệ và lớn hơn 0.';
            return;
        }
        
        // Kết thúc Validation 

        // Dữ liệu hợp lệ: Tiếp tục thêm sản phẩm
        
        // Tạo phần tử HTML cho sản phẩm mới
        const newItem = document.createElement('article');
        newItem.className = 'product-item';
        
        // Sử dụng phương thức toLocaleString để định dạng giá theo tiền Việt
        const formattedPrice = price.toLocaleString('vi-VN');

        // Nội dung HTML bên trong article
        newItem.innerHTML = `
            <img src="https://placehold.co/300x400/4CAF50/fff?text=Sách+Mới" alt="Ảnh sách ${name}">
            <h3 class="product-name">${name}</h3>
            <p class="product-author">Tác giả: ${author}</p>
            <p class="product-description">${desc || "Mô tả sản phẩm mới được thêm từ người dùng."}</p>
            <p class="product-price">${formattedPrice} <span>đ</span></p>
        `;

        // Chèn sản phẩm mới vào danh sách (Chèn lên đầu danh sách)
        productList.prepend(newItem); 

        // Đóng form và reset
        toggleForm(); 
        
        // Đảm bảo sản phẩm mới được bao gồm trong lần tìm kiếm tiếp theo
        filterProducts();
    });

    // Khởi tạo: Đảm bảo tất cả sản phẩm hiển thị khi load
    filterProducts();
});
