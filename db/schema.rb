# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161104111447) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "response_fields", force: :cascade do |t|
    t.integer  "question_id"
    t.integer  "field_type"
    t.string   "block_key"
    t.text     "content"
    t.integer  "score"
    t.boolean  "autocheck"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.text     "user_content"
    t.integer  "user_score"
    t.boolean  "checked",      default: false
  end

  create_table "response_options", force: :cascade do |t|
    t.string   "content"
    t.boolean  "is_correct"
    t.integer  "field_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "order_index"
    t.boolean  "user_selected"
    t.index ["field_id"], name: "index_response_options_on_field_id", using: :btree
  end

  create_table "response_questions", force: :cascade do |t|
    t.string   "content"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "section_id"
    t.integer  "order_index"
    t.index ["section_id"], name: "index_response_questions_on_section_id", using: :btree
  end

  create_table "response_sections", force: :cascade do |t|
    t.string   "title"
    t.integer  "time_limit"
    t.integer  "response_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.text     "description"
    t.integer  "required_score"
    t.string   "uuid"
    t.integer  "score_units"
    t.integer  "order_index"
    t.integer  "acceptable_score"
    t.index ["response_id"], name: "index_response_sections_on_response_id", using: :btree
  end

  create_table "responses", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "testee_id"
    t.integer  "test_id"
    t.index ["testee_id"], name: "index_responses_on_testee_id", using: :btree
  end

  create_table "test_fields", force: :cascade do |t|
    t.integer  "question_id"
    t.integer  "field_type"
    t.string   "block_key"
    t.text     "content"
    t.integer  "score"
    t.boolean  "autocheck"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "test_options", force: :cascade do |t|
    t.string   "content"
    t.boolean  "is_correct"
    t.integer  "field_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "order_index"
    t.index ["field_id"], name: "index_test_options_on_field_id", using: :btree
  end

  create_table "test_questions", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "section_id"
    t.integer  "order_index"
    t.index ["section_id"], name: "index_test_questions_on_section_id", using: :btree
  end

  create_table "test_sections", force: :cascade do |t|
    t.string   "title"
    t.integer  "time_limit"
    t.integer  "test_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.text     "description"
    t.integer  "required_score"
    t.integer  "required_score_units"
    t.integer  "order_index"
    t.integer  "bonus_time"
    t.boolean  "shuffle_questions"
    t.integer  "questions_to_show"
    t.integer  "acceptable_score"
    t.integer  "acceptable_score_units"
    t.integer  "show_next_section"
    t.index ["test_id"], name: "index_test_sections_on_test_id", using: :btree
  end

  create_table "testees", force: :cascade do |t|
    t.integer  "source_type", default: 1
    t.integer  "user_id"
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "tests", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "email",              default: "", null: false
    t.integer  "sign_in_count",      default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.integer  "city_id"
    t.jsonb    "settings"
  end

  add_foreign_key "responses", "testees"
  add_foreign_key "test_questions", "test_sections", column: "section_id"
end
