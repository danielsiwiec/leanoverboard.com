module Jekyll
  class ImageTag < Liquid::Tag

    def initialize(tag_name, url, tokens)
      super
      @url = url
    end

    def render(context)
      "<a href='#{@url}'><img src='#{@url}' height='200' width='320' /></a>"
    end
  end
end

Liquid::Template.register_tag('img', Jekyll::ImageTag)
