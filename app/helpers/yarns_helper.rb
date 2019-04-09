module YarnsHelper

  # def alphabetical_yarn_with_amount(brand)
  #   <% brand.yarns_by_color.each do |yarn| %>
  #     <% if yarn.count && yarn.scrap %>
  #       <% if yarn.scrap.to_f == 0.0 && yarn.count == 1 %>
  #         <li><%= link_to yarn.color, edit_yarn(yarn) %> (<%= yarn.count %> skein)</li>
  #       <% elsif yarn.scrap.to_f == 0.0 && yarn.count > 1 %>
  #         <li><%= link_to yarn.color, edit_yarn(yarn) %> (<%= yarn.count %> skeins)</li>
  #       <% elsif yarn.count == 1 %>
  #         <li><%= link_to yarn.color, edit_yarn(yarn) %> (<%= yarn.count %> skein, <%= yarn.scrap.to_f %> oz. scrap)</li>
  #       <% elsif yarn.count > 1 %>
  #         <li><%= link_to yarn.color, edit_yarn(yarn) %> (<%= yarn.count %> skeins, <%= yarn.scrap.to_f %> oz. scrap)</li>
  #       <% end %>
  #     <% elsif yarn.count && yarn.count == 1 %>
  #       <li><%= link_to yarn.color, edit_yarn(yarn) %> (<%= yarn.count %> skein)</li>
  #     <% elsif yarn.count && yarn.count > 1 %>
  #       <li><%= link_to yarn.color, edit_yarn(yarn) %> (<%= yarn.count %> skeins)</li>
  #     <% elsif yarn.scrap && yarn.scrap.to_f > 0.0 %>
  #       <li><%= link_to yarn.color, edit_yarn(yarn) %> (<%= yarn.scrap.to_f %> oz. scrap)</li>
  #     <% end %>
  #   <% end %>
  # end

end
