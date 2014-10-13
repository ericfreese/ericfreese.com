module ApplicationHelper
  def preview_content(content)
    return unless content.is_a? Content

    return content.preview if content.preview.present?

    begin
      truncate(strip_tags(render(:partial => "#{content.type.pluralize.underscore}/#{content.slug.underscore}")), length: 140)
    rescue ActionView::MissingTemplate
      return ''
    end
  end
end
