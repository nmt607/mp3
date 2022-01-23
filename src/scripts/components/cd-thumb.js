// Xử lý phóng to / thu nhỏ CD
// Handles CD enlargement / reduction
const headerBody = $('.header__body--js')
const headerBodyWidth = headerBody.width()

$(document).on("scroll", function(){
    const scrollTopDistance = $(window).scrollTop() || $(document).scrollTop()
    const headerBodyNewWidth = headerBodyWidth - scrollTopDistance > 0 ? headerBodyWidth - scrollTopDistance : 0    
    headerBody
      .css('width',headerBodyNewWidth)
      .css('opacity',headerBodyNewWidth/headerBodyWidth)   
  });