
document.addEventListener('DOMContentLoaded', () => {

    // Xử lý tìm kiếm/lọc sản phẩm
    const searchInput = document.getElementById('searchInput');
    // Get all product articles
    const productItems = document.querySelectorAll('.product-item');
    const searchButton = document.getElementById('searchBtn');

    // Function to perform product filtering
    const filterProducts = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (productItems.length === 0) {
            console.error("Lỗi: Không tìm thấy sản phẩm nào với selector '.product-item'.");
            return;
        }

        
        if (searchTerm === '') {
            productItems.forEach(item => {
                item.style.display = ''; // Hiển thị lại tất cả
            });
            return; 
        }

        productItems.forEach(item => {
            
            const productNameElement = item.querySelector('.product-name');
            if (productNameElement) {
                // Đã thêm .trim() vào productName để loại bỏ khoảng trắng thừa/ký tự xuống dòng
                const productName = productNameElement.textContent.toLowerCase().trim();
                
                // Check if the product name includes the search term
                if (productName.includes(searchTerm)) {
                    
                    item.style.display = ''; 
                } else {
                    // Ẩn sản phẩm
                    item.style.display = 'none';
                }
            } else {
                 console.warn("Cảnh báo: Không tìm thấy phần tử .product-name trong một article.");
            }
        });
    };

    // Attach "click" event to the search button
    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); // Ngăn chặn mọi hành vi mặc định của nút (như reload trang)
        filterProducts(); // Gọi hàm lọc
    });


    // Xử lý ẩn/hiện form "Thêm sản phẩm"
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductFormSection = document.getElementById('addProductFormSection'); 

    // Attach "click" event to the "Add Product" button
    addProductBtn.addEventListener('click', () => {
       
        addProductFormSection.classList.toggle('hidden');

        // Optional: Update button text
        if (addProductFormSection.classList.contains('hidden')) {
            addProductBtn.textContent = 'Thêm sản phẩm';
        } else {
            addProductBtn.textContent = 'Ẩn Form Thêm Sản Phẩm';
        }
    });

    // Xử lý sự kiện submit form Thêm sản phẩm
    const newProductForm = addProductFormSection.querySelector('form');

    if (newProductForm) {
        newProductForm.addEventListener('submit', (event) => {
            // Ngăn chặn form gửi dữ liệu lên server và reload trang.
            event.preventDefault(); 
            
            // ... (Phần log và thông báo vẫn giữ nguyên)
            
            console.log('--- FORM SUBMITTED ---');
            console.log('Tên SP:', document.getElementById('newProductName').value);
            console.log('Giá:', document.getElementById('newProductPrice').value);
            
            // Thay thế alert() bằng thông báo nhẹ nhàng hơn (vì alert bị cấm)
            const submitMessage = document.createElement('p');
            submitMessage.textContent = 'Thành công! Đã chặn submit form và lấy được dữ liệu sản phẩm mới. (Kiểm tra Console)';
            submitMessage.style.cssText = 'color: green; font-weight: bold; margin-top: 10px;';
            newProductForm.insertAdjacentElement('afterend', submitMessage);

            // Tự động xóa thông báo sau 3 giây
            setTimeout(() => {
                submitMessage.remove();
            }, 3000);

            newProductForm.reset(); // Xóa dữ liệu form sau khi submit
        });
    } else {
        console.error("Lỗi: Không tìm thấy form bên trong #addProductFormSection.");
    }
});
