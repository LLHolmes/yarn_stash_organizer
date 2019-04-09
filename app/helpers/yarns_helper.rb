module YarnsHelper
  # def amount_of_yarn
  #   <% if @yarn.count && @yarn.scrap %>
  #     <% if @yarn.scrap.to_f == 0.0 %>
  #       <p>Full skeins in stash: <%= @yarn.count %></p>
  #     <% else %>
  #       <p>Full skeins in stash: <%= @yarn.count %></p>
  #       <p>Scraps in stash: <%= @yarn.scrap.to_f %> oz.</p>
  #     <% end %>
  #   <% elsif @yarn.count %>
  #     <p>Full skeins in stash: <%= @yarn.count %></p>
  #   <% elsif @yarn.scrap %>
  #     <p>Scraps in stash: <%= @yarn.scrap.to_f %> oz.</p>
  #   <% end %>
  # end

  def amount_of_yarn
    <% brand.yarns_by_color.each do |yarn| %>
      <% if yarn.count && yarn.scrap %>
        <% if yarn.scrap.to_f == 0.0 && yarn.count == 1 %>
          <li><a href="/yarns/<%= yarn.id %>"><%= yarn.color %></a> (<%= yarn.count %> skein)</li>
        <% elsif yarn.scrap.to_f == 0.0 && yarn.count > 1 %>
          <li><a href="/yarns/<%= yarn.id %>"><%= yarn.color %></a> (<%= yarn.count %> skeins)</li>
        <% elsif yarn.count == 1 %>
          <li><a href="/yarns/<%= yarn.id %>"><%= yarn.color %></a> (<%= yarn.count %> skein, <%= yarn.scrap.to_f %> oz. scrap)</li>
        <% elsif yarn.count > 1 %>
          <li><a href="/yarns/<%= yarn.id %>"><%= yarn.color %></a> (<%= yarn.count %> skeins, <%= yarn.scrap.to_f %> oz. scrap)</li>
        <% end %>
      <% elsif yarn.count && yarn.count == 1 %>
        <li><a href="/yarns/<%= yarn.id %>"><%= yarn.color %></a> (<%= yarn.count %> skein)</li>
      <% elsif yarn.count && yarn.count > 1 %>
        <li><a href="/yarns/<%= yarn.id %>"><%= yarn.color %></a> (<%= yarn.count %> skeins)</li>
      <% elsif yarn.scrap %>
        <li><a href="/yarns/<%= yarn.id %>"><%= yarn.color %></a> (<%= yarn.scrap.to_f %> oz. scrap)</li>
      <% end %>
    <% end %>
  end
end
