require 'rake'

task :new, [:title] do |t, args|
  file_name = "_posts/#{Time.new.strftime("%Y-%m-%d")}-#{args['title'].downcase.gsub(' ','-')}.md"
  File.open(file_name, 'w') {|f| f.write(<<-END
---
title: '#{args['title']}'
---
    END
    ) }
end
