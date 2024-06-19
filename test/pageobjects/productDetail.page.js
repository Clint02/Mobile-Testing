import { $ } from '@wdio/globals'

class ProductDetailPage {
  get productDesc() {
    return $(
      '(//*[@content-desc="test-Description"]/android.widget.TextView)[2]',
    )
  }
}

export default new ProductDetailPage()
