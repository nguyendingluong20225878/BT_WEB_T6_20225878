
document.addEventListener('DOMContentLoaded', () => {

  
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchBtn');
    const productList = document.getElementById('product-list');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductFormSection = document.getElementById('addProductFormSection'); 
    const newProductForm = document.getElementById('newProductForm');
    const errorMsg = document.getElementById('errorMsg');
    const cancelBtn = document.getElementById('cancelBtn');

    // Mảng dữ liệu sản phẩm 
    let products = [];
    
    // Sản phẩm mẫu ban đầu (dùng khi LocalStorage trống)
    // Đã thêm trường imageUrl riêng biệt cho 3 sản phẩm mẫu
    const initialProducts = [
        { 
            name: "Tư Duy Nhanh và Chậm", 
            author: "Daniel Kahneman", 
            price: 99000, 
            desc: "Khám phá hai hệ thống chi phối cách chúng ta suy nghĩ và đưa ra quyết định.",
            imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSVUEEzhz12vM6t6JRFpjiLqBxwh0aThZRqzbzMA1jmVHYRTdxG6rTSJ7D8RbjviApZmPSjxIcwtEHN5WNTx5OOrjB0bWF1eQC2iXVNeZSkogkE2UNbcPwGMcuVleux3Mbt&usqp=CAc"
        },
        { 
            name: "HELO CA NHA", 
            author: "123321", 
            price: 75000, 
            desc: "Tiểu thuyết mô tả một xã hội dưới sự kiểm soát toàn diện của Chính phủ.",
            imageUrl: "https://placehold.co/300x400/28a745/fff?text=HELO+CA+NHA" 
        },
        { 
            name: "Nhà Giả Kim", 
            author: "Paulo Coelho", 
            price: 65000, 
            desc: "Câu chuyện cổ tích hiện đại về hành trình theo đuổi ước mơ của cậu bé chăn cừu Santiago.",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69LXkhdOyITgw2wo0mqarwC4jQEBfIHyHny5mg8_1mt0ktUsAanLzrSs&s" 
        }
    ];
    
    
    // Ghi dữ liệu vào LocalStorage
    const saveProducts = () => {
        // Ghi mảng 'products' vào localStorage dưới dạng chuỗi JSON
        localStorage.setItem('products', JSON.stringify(products));
    };

    // Tải dữ liệu từ LocalStorage
    const loadProducts = () => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            try {
                // Parse chuỗi JSON thành mảng đối tượng
                products = JSON.parse(storedProducts);
            } catch (e) {
                console.error("Lỗi khi phân tích dữ liệu từ LocalStorage:", e);
                // Nếu lỗi, sử dụng dữ liệu mẫu
                products = initialProducts;
            }
        } else {
            // Nếu không có dữ liệu, sử dụng sản phẩm mẫu và lưu lại lần đầu
            products = initialProducts;
            saveProducts();
        }
    };
    
    // Dựng giao diện HTML từ mảng dữ liệu products
    const renderProducts = () => {
        productList.innerHTML = ''; // Xóa nội dung cũ

        // Tạo một bản sao mảng và đảo ngược thứ tự để sản phẩm mới nhất hiện thị đầu tiên 
        const productsToRender = [...products].reverse();

        productsToRender.forEach(product => {
            const newItem = document.createElement('article');
            newItem.className = 'product-item';
            
            // Định dạng giá tiền Việt
            const formattedPrice = product.price.toLocaleString('vi-VN');
            
           
            const imageSrc = product.imageUrl 
                ? product.imageUrl 
                : `https://placehold.co/300x400/4CAF50/fff?text=${product.name.substring(0, 10).replace(/\s/g, '+')}`;


            // Nội dung HTML bên trong article
            newItem.innerHTML = `
                <img src="${imageSrc}" alt="Ảnh sách ${product.name}">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-author">Tác giả: ${product.author}</p>
                <p class="product-description">${product.desc || "Mô tả sản phẩm."}</p>
                <p class="product-price">${formattedPrice} <span>đ</span></p>
            `;
            
            productList.appendChild(newItem);
        });
        
        // Sau khi render xong, áp dụng lại bộ lọc 
        filterProducts(true);
    };

 
    
    const filterProducts = (isInitialRender = false) => {
        const productItems = document.querySelectorAll('.product-item');
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Nếu ô tìm kiếm trống VÀ không phải là lệnh render đầu tiên, hiển thị hết
        if (searchTerm === '' && !isInitialRender) {
            productItems.forEach(item => { item.style.display = ''; });
            return;
        }

        // Lọc sản phẩm trên DOM
        productItems.forEach(item => {
            const productNameElement = item.querySelector('.product-name');
            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase().trim();
                
                // Hiển thị nếu tên sản phẩm chứa từ khóa tìm kiếm
                if (productName.includes(searchTerm)) {
                    item.style.display = ''; 
                } else {
                    item.style.display = 'none'; 
                }
            }
        });
    };

    // Gắn sự kiện "click" cho nút tìm kiếm
    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        filterProducts(); 
    });


  
    
    const toggleForm = () => {
        addProductFormSection.classList.toggle('hidden');
        newProductForm.reset(); 
        errorMsg.textContent = ''; 

        if (addProductFormSection.classList.contains('hidden')) {
            addProductBtn.textContent = 'Thêm sản phẩm';
        } else {
            addProductBtn.textContent = 'Ẩn Form Thêm Sản Phẩm';
        }
    }

    addProductBtn.addEventListener('click', toggleForm);
    cancelBtn.addEventListener('click', toggleForm);


  
    newProductForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        // Lấy giá trị từ form
        const name = document.getElementById('newName').value.trim();
        const author = document.getElementById('newAuthor').value.trim(); 
        const priceInput = document.getElementById('newPrice');
        const price = Number(priceInput.value);
        const desc = document.getElementById('newDesc').value.trim();
        
        errorMsg.textContent = ''; 

        // Validation 
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

        // Dữ liệu hợp lệ: Tạo đối tượng sản phẩm mới
        const newProduct = {
            name: name,
            author: author,
            price: price,
            desc: desc
            // Sản phẩm mới không có imageUrl, sẽ dùng placeholder mặc định
        };

        // Thêm vào mảng products và lưu lại LocalStorage
        products.push(newProduct); // Thêm vào cuối mảng products
        saveProducts(); // LƯU VÀO LOCALSTORAGE

        // Cập nhật giao diện
        renderProducts(); 
        
        // Đóng form và reset
        toggleForm(); 
    });

   
    loadProducts(); 
    renderProducts(); 
});
